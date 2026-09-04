import { writeFileSync } from "node:fs"
import { askingFor } from "@akasha/pages-system-service/calling"

export const CHANGED_FILES_KEY = "changedFiles"

const PIPELINE = "pipeline"

const SEQ_KEY = "seq"

const SAID = "[changed-files]"

export function fileBody(files: readonly string[]): string {
  if (files.length === 0) {
    throw new Error(
      "a manifest naming no file runs every check over an empty tree and reports it green, so none is written"
    )
  }
  return `${files.join("\n")}\n`
}

export function filesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return held === "" ? [] : [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string" && one !== "")
}

export async function readChangedFiles(seq: string): Promise<readonly string[]> {
  const asked = await askingFor({
    pageTypeSlug: PIPELINE,
    where: { [SEQ_KEY]: { is: seq } },
    keys: [CHANGED_FILES_KEY],
  })
  if ("refused" in asked) {
    throw new Error(`the pipeline page at seq ${seq} went unread: ${asked.refused}`)
  }
  if (asked.rows.length !== 1) {
    throw new Error(
      `${asked.rows.length} pipeline pages stand at seq ${seq}, so which one states the change is undecided`
    )
  }
  const row = asked.rows[0]
  const files = row === undefined ? [] : filesIn(row[CHANGED_FILES_KEY])
  if (files.length === 0) {
    throw new Error(
      `the pipeline page at seq ${seq} states an empty \`${CHANGED_FILES_KEY}\`, and a pipeline stands only for a diff that named a file`
    )
  }
  return files
}

export async function writeChangedFiles(seq: string, out: string): Promise<readonly string[]> {
  const files = await readChangedFiles(seq)
  writeFileSync(out, fileBody(files))
  return files
}

function flag(argv: readonly string[], name: string): string {
  const at = argv.indexOf(name)
  const value = at === -1 ? undefined : argv[at + 1]
  if (value === undefined || value.startsWith("--")) {
    console.error(`${SAID} ${name} is required`)
    process.exit(1)
  }
  return value
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const seq = flag(argv, "--seq")
  const out = flag(argv, "--out")
  let files: readonly string[]
  try {
    files = await writeChangedFiles(seq, out)
  } catch (thrown) {
    console.error(`${SAID} ${thrown instanceof Error ? thrown.message : String(thrown)}`)
    process.exit(1)
  }
  console.log(`${SAID} wrote ${files.length} changed file(s) to ${out}`)
}

if (import.meta.main) await main()
