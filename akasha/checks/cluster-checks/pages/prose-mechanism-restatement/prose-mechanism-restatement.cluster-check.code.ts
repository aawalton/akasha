#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { z } from "zod"
import {
  applyRatchet,
  carriesProse,
  findRestatements,
  nextRatchet,
  PROSE_CARRIER_KINDS,
  type RatchetVerdict,
  type Restatement,
  restatementCarrier,
  restatementKey,
  UNLEXED_KINDS,
} from "../../../../../tools/lib/check-workflow/prose-mechanism-restatement"
import { repoFilesAt } from "../../../../../tools/lib/repo-files-at.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  departedDetail,
  renderTightening,
} from "../../modules/suppression-subject/suppression-subject.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[prose-mechanism-restatement]"
const RATCHET_REL =
  "akasha/checks/cluster-checks/pages/prose-mechanism-restatement/prose-mechanism-restatement.ratchet.json"
const RATCHET_SCHEMA = z.object({ accepted: z.array(z.string()) }).strict()

const BOUND = [
  `${PREFIX} This is a RATCHET, not a coverage check: it goes red when a restatement is ADDED,`,
  `${PREFIX} never on the accepted set existing. It is not an exclusivity check and its green is`,
  `${PREFIX} not evidence that the accepted restatements are correct.`,
  `${PREFIX} Authoritative for exactly one question: does a prose span enumerate the field names`,
  `${PREFIX} of a function's object parameter? It is SILENT on whether any prose description of`,
  `${PREFIX} behaviour is true — a doc passes this while misdescribing what the function does, and`,
  `${PREFIX} both failures have been observed on one line of one file.`,
  `${PREFIX} Read: ${PROSE_CARRIER_KINDS.join(", ")} — the whole file where the file is the prose,`,
  `${PREFIX} comments elsewhere.`,
  `${PREFIX} Unexamined: fenced code blocks, spans carrying a key with a value (usage, not a`,
  `${PREFIX} restatement), prose that paraphrases a mechanism without transcribing it, and every`,
  `${PREFIX} file class there is no comment lexer for — ${UNLEXED_KINDS.join(", ")}.`,
  `${PREFIX} Those read as UNEXAMINED, never as absent.`,
].join("\n")

function readRatchet(): readonly string[] {
  const text = readFileSync(resolve(ownRepoRoot(), RATCHET_REL), "utf8")
  return RATCHET_SCHEMA.parse(JSON.parse(text)).accepted
}

function tally(verdict: RatchetVerdict): string {
  const parts: string[] = []
  if (verdict.repaired.length > 0) {
    parts.push(
      `${verdict.repaired.length} whose carrier is still among the prose carriers and whose transcription ` +
        `is gone (a repair)`
    )
  }
  if (verdict.departed.length > 0) {
    parts.push(
      `${verdict.departed.length} whose carrier has left the prose carriers (a departure — the file went, ` +
        `nobody edited prose)`
    )
  }
  return parts.join(" and ")
}

type ProseRefusal =
  | (Restatement & { readonly refusal: "restatement-added" })
  | { readonly refusal: "carrier-departed"; readonly file: string; readonly message: string }

function refusals(verdict: RatchetVerdict): readonly ProseRefusal[] {
  return [
    ...verdict.failures.map((v): ProseRefusal => ({ ...v, refusal: "restatement-added" })),
    ...verdict.departed.map((entry): ProseRefusal => {
      const carrier = restatementCarrier(entry)
      return {
        refusal: "carrier-departed",
        file: carrier,
        message: departedDetail({ departed: { entry, carrier }, carrierNoun: "prose carrier" }),
      }
    }),
  ]
}

function writeRatchet(verdict: RatchetVerdict, accepted: readonly string[]): never {
  const drop = [...verdict.departed, ...verdict.repaired]
  const foundKeys = verdict.failures.map(restatementKey).concat(verdict.grandfathered)
  const next = nextRatchet(foundKeys, accepted, drop)
  if (next.kind === "refused") {
    console.error(`${PREFIX} REFUSED to widen the accepted list. Not already accepted:`)
    for (const key of next.wouldAdd) console.error(`${PREFIX}   ${key}`)
    console.error(
      `${PREFIX} Delete the restatement instead — that is the only way this list moves.`
    )
    process.exit(2)
  }
  writeFileSync(
    resolve(ownRepoRoot(), RATCHET_REL),
    `${JSON.stringify({ accepted: next.accepted }, null, 2)}\n`
  )
  console.log(
    `${PREFIX} dropped ${drop.length} accepted entr${drop.length === 1 ? "y" : "ies"}` +
      `${drop.length === 0 ? "" : `: ${tally(verdict)}`}; ${next.accepted.length} accepted remain`
  )
  process.exit(0)
}

async function main(): Promise<undefined> {
  let flags: { write?: boolean; json?: boolean }
  let repoRoot: string
  try {
    const parsed = parseArgs(
      process.argv.slice(2),
      { ...STANDARD_FLAGS, write: { kind: "boolean" } },
      { passthrough: true }
    )
    flags = parsed.flags
    repoRoot = parsed.flags.repoRoot === undefined ? getRepoRoot() : resolve(parsed.flags.repoRoot)
  } catch (err) {
    console.error(`${PREFIX} ${errorMessage(err)}`)
    process.exit(2)
  }

  let files: readonly string[]
  let accepted: readonly string[]
  try {
    files = repoFilesAt(repoRoot).filter(carriesProse)
    accepted = readRatchet()
  } catch (err) {
    console.error(`${PREFIX} Failed to assemble the prose carriers: ${errorMessage(err)}`)
    process.exit(2)
  }

  const read = new Set<string>()

  const { population, violations: found } = examineFilePopulation<Restatement>({
    files,
    unit: "prose carriers",
    membership: {
      kind: "enumerated",
      because:
        "`repoFilesAt` enumerates the repo off `git ls-files` and THROWS with git's own stderr where that fails rather than returning a short list, so either the members are the tracked non-fixture files or the run does not reach here at all; the filter after it drops only classes `PROSE_FORM` has no comment lexer for, decided from the path with nothing opened",
    },
    pathOf: (rel) => resolve(repoRoot, rel),
    scan: (rel, text) => {
      read.add(rel)
      return findRestatements(rel, text)
    },
  })

  const verdict = applyRatchet(found, accepted, read)

  if (flags.write === true) writeRatchet(verdict, accepted)

  const tightening = renderTightening({
    prefix: PREFIX,
    repaired: verdict.repaired,
    defectNoun: "transcription",
  })

  exitOnResult<ProseRefusal>({
    violations: refusals(verdict),
    options: {
      population,
      format: flags.json === true ? "json" : "human",
      prefix: PREFIX,
      header:
        "A prose restatement of a declared field set was ADDED, or the accepted list names a carrier that is gone",
      formatViolation: (v) =>
        v.refusal === "carrier-departed"
          ? v.message
          : `${v.file}:${v.line} — ${v.span} transcribes the field set of \`${v.symbol}\`, which ` +
            `the type already declares. Delete the transcription and name the function instead; ` +
            `syncing it keeps a second carrier that nothing updates when the first one changes.`,
      footer: (count) =>
        `${count} refusal${count === 1 ? "" : "s"}; ` +
        `${verdict.grandfathered.length} accepted and enumerated in ${RATCHET_REL}.` +
        `${tightening}\n${BOUND}`,
      successMessage:
        `no restatement added and no accepted entry names a departed carrier; ` +
        `${verdict.grandfathered.length} accepted and enumerated in ` +
        `${RATCHET_REL}.${tightening}\n${BOUND}`,
    },
  })
}

await main()
