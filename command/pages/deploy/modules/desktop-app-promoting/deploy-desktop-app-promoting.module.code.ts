import { homedir } from "node:os"
import { join } from "node:path"
import { ranAwaited } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  answeredWith,
  OPERATIONAL,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { allowedAgain } from "akasha/command/modules/stopping/command-stopping.module.code.ts"

const PROMOTE_ALLOWED = 3600

export const TAIL = 20

const SCRIPT = join("tools", "promote.sh")

const MERGED = 'exec "$@" 2>&1'

export type Promoted = { readonly code: number; readonly lines: readonly string[] }

export type Promoting = (argv: readonly string[]) => Promise<Promoted>

function reposIn(): string {
  return optionalEnv("REPOS_ROOT") ?? join(homedir(), "repos")
}

export function scriptFor(slug: string, repos: string): string {
  return join(repos, slug, SCRIPT)
}

async function ranScript(argv: readonly string[]): Promise<Promoted> {
  const done = await ranAwaited(["bash", "-c", MERGED, "promote", ...argv])
  return { code: done.code, lines: done.out.split("\n").filter((line) => line.trim() !== "") }
}

export async function promotedApp(
  slug: string,
  calledAs: string,
  up: string[],
  promoting: Promoting = ranScript,
  repos: string = reposIn()
): Promise<Answer> {
  const script = scriptFor(slug, repos)
  allowedAgain(PROMOTE_ALLOWED, calledAs)
  const said = await promoting(["bash", script])
  const tail = said.lines.slice(-TAIL)
  if (said.code !== 0) {
    return answeredWith(
      tail,
      [`the promote script at ${script} ended at ${String(said.code)}`],
      OPERATIONAL
    )
  }
  up.push(`${slug}, promoted by ${script}`)
  return told(tail)
}
