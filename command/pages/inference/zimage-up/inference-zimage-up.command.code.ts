import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceZimageUp as page } from "akasha/command/pages/inference/zimage-up/inference-zimage-up.command.ts"
import { zimageUp } from "akasha/infrastructure/inference/generation/zimage/up/zimage-up.shell-script.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

type Ran = { readonly code: number; readonly lines: readonly string[] }

export type Running = (argv: readonly string[]) => Promise<Ran>

function scriptAt(root: string): string {
  return resolve(root, fileOf(root, valuedAt(root, SCRIPT, zimageUp.slug), SCRIPT, SHELL))
}

function linesOf(text: string): readonly string[] {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line !== "")
}

async function ran(argv: readonly string[]): Promise<Ran> {
  const proc = Bun.spawn([...argv], { stdout: "pipe", stderr: "pipe" })
  const [out, err, code] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { code, lines: [...linesOf(out), ...linesOf(err)] }
}

export async function upped(script: string, running: Running): Promise<Answer> {
  const said = await running(["bash", script])
  if (said.code === 0) return told(said.lines)
  return refusedBy(
    [`the ${zimageUp.slug} script ended at ${String(said.code)}, and wrote:`, ...said.lines],
    OPERATIONAL
  )
}

export async function inferenceZimageUp(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)

  return await answering(async () => await upped(scriptAt(given.root), ran))
}
