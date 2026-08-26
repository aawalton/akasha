export const summary = "Change passages in place as a patch, gated before anything lands"

import { readFileSync } from "node:fs"
import { decodeUtf8 } from "../../agent/command/read/utf8-body.ts"
import { applyPairs, parsePairs } from "../edit-pairs.ts"
import {
  bodyFile,
  gateOrRefuse,
  HERE,
  inside,
  type Landing,
  mustBeInside,
  patchText,
  payloadText,
  runTool,
  valueOf,
} from "./patch.ts"

const EDIT_TOOL = "edit.ts"

const MECHANICAL = "--mechanical"

interface Declared {
  readonly filePath: string
  readonly source: Record<string, unknown>
}

function declaredIn(text: string): readonly Declared[] {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return []
  }
  const many = Array.isArray(read) ? read : [read]
  const found: Declared[] = []
  for (const one of many) {
    if (typeof one !== "object" || one === null) continue
    const held = one as Record<string, unknown>
    const filePath = held["file_path"]
    if (typeof filePath !== "string") continue
    found.push({ filePath, source: held })
  }
  return found
}

function landingsIn(declared: readonly Declared[]): readonly Landing[] {
  const landings: Landing[] = []
  const refusals: string[] = []
  for (const one of declared) {
    const relPath = mustBeInside(one.filePath)
    let bytes: Uint8Array
    try {
      bytes = readFileSync(`${HERE}/${relPath}`)
    } catch {
      refusals.push(`${relPath} does not exist — \`edit\` changes a file that is there`)
      continue
    }
    const body = decodeUtf8(bytes)
    if (body === null) {
      refusals.push(`${relPath} is not UTF-8 text, so no substitution can be stated against it`)
      continue
    }
    let applied: { body: string } | { refusal: string }
    try {
      applied = applyPairs(body, parsePairs(one.source, relPath))
    } catch (thrown) {
      refusals.push(thrown instanceof Error ? thrown.message : String(thrown))
      continue
    }
    if ("refusal" in applied) {
      refusals.push(`${relPath} ${applied.refusal}`)
      continue
    }
    landings.push({ relPath, from: bodyFile(applied.body) })
  }
  if (refusals.length > 0) {
    process.stderr.write(`refused:\n${refusals.map((one) => `  ${one}`).join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  return landings
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "A call addressing akasha has its substitutions applied here to work out the body each file " +
    "would end at, that set is turned into a patch against HEAD, the checks akasha defines are " +
    "run over the files that patch changes, and only then is it handed on to be gated and " +
    "landed. A call addressing any other repository is forwarded unchanged, those repositories " +
    "having nothing to patch for.\n" +
    "\n" +
    "A pair that matches no times or more than once is refused HERE, before any check runs, " +
    "because there is no body to judge until every substitution has landed somewhere.\n" +
    "\n" +
    "Every flag belongs to `tools/edit.ts` and is named in the help below, which is that tool's own.",
  flags: [],
  positionals: [
    { name: "args", required: false, variadic: true, description: "Forwarded to `tools/edit.ts`." },
  ],
  epilog: () => runTool(EDIT_TOOL, ["--help"], true),
}

export default async function edit(argv: readonly string[]): Promise<void> {
  const text = argv.includes("--help") ? null : payloadText(argv, true)
  let forward = argv
  if (text !== null && valueOf(argv, "--input-file") === null) {
    forward = [...argv, "--input-file", bodyFile(text)]
  }
  const declared = text === null ? [] : declaredIn(text)
  if (!declared.some((one) => inside(one.filePath) !== null)) {
    await runTool(EDIT_TOOL, forward, false)
    return
  }

  const landings = landingsIn(declared)
  gateOrRefuse(patchText(landings), argv.includes(MECHANICAL), landings.length)
  await runTool(EDIT_TOOL, forward, false)
}
