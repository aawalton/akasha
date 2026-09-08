#!/usr/bin/env bun

import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import {
  carriesProse,
  findRestatements,
  PROSE_CARRIER_KINDS,
  type Restatement,
  UNLEXED_KINDS,
} from "../../modules/prose-mechanism-restatement/prose-mechanism-restatement.module.code.ts"
import { discoverRepoFiles } from "../../modules/repo-files/repo-files.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[prose-mechanism-restatement]"

const BOUND = [
  `${PREFIX} Every restatement found is refused, and none is exempt.`,
  `${PREFIX} It is not an exclusivity check and its green is not evidence that the prose is right.`,
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

async function main(): Promise<undefined> {
  let flags: { json?: boolean }
  let repoRoot: string
  try {
    const parsed = parseArgs(process.argv.slice(2), STANDARD_FLAGS, { passthrough: true })
    flags = parsed.flags
    repoRoot = parsed.flags.repoRoot === undefined ? getRepoRoot() : resolve(parsed.flags.repoRoot)
  } catch (err) {
    console.error(`${PREFIX} ${errorMessage(err)}`)
    process.exit(2)
  }

  let files: readonly string[]
  try {
    files = discoverRepoFiles(repoRoot).filter(carriesProse)
  } catch (err) {
    console.error(`${PREFIX} Failed to assemble the prose carriers: ${errorMessage(err)}`)
    process.exit(2)
  }

  const { population, violations: found } = examineFilePopulation<Restatement>({
    files,
    unit: "prose carriers",
    membership: {
      kind: "enumerated",
      because:
        "`discoverRepoFiles` enumerates the repo off `git ls-files` and THROWS with git's own stderr where that fails rather than returning a short list, so either the members are the tracked non-fixture files or the run does not reach here at all; the filter after it drops only classes `PROSE_FORM` has no comment lexer for, decided from the path with nothing opened",
    },
    pathOf: (rel) => resolve(repoRoot, rel),
    scan: (rel, text) => findRestatements(rel, text),
  })

  exitOnResult<Restatement>({
    violations: found,
    options: {
      population,
      format: flags.json === true ? "json" : "human",
      prefix: PREFIX,
      header: "A prose restatement of a declared field set was found",
      formatViolation: (v) =>
        `${v.file}:${v.line} — ${v.span} transcribes the field set of \`${v.symbol}\`, which ` +
        `the type already declares. Delete the transcription and name the function instead; ` +
        `syncing it keeps a second carrier that nothing updates when the first one changes.`,
      footer: (count) => `${count} refusal${count === 1 ? "" : "s"}.\n${BOUND}`,
      successMessage: `no restatement found.\n${BOUND}`,
    },
  })
}

await main()
