import { AKASHA, resolveRoots, rootFor } from "../../../../repo/roots/roots"
import {
  commitSha40,
  inputsHash12,
  toShortSha7,
  treeSha40,
} from "../../../../tools/lib/workflow-dsl/ci-identifiers.ts"
import { discoverWorkflows } from "../../../../tools/lib/workflow-dsl/discovery.ts"
import { z } from "zod"

const SOURCE_CAPTURE = z.tuple([z.string(), z.string()])

export const RESOLUTION_WORKSPACE = "/workspace"

const STATEMENT_SEPARATOR = /;|&&|\|\||\n/
const SOURCE_STATEMENT = /^(?:\.|source)\s+(\S+)$/
const SHELL_SUFFIX = ".sh"

const unquote = (token: string): string => {
  const first = token.at(0)
  if (first === undefined) return token
  if (first !== '"' && first !== "'") return token
  return token.endsWith(first) && token.length >= 2 ? token.slice(1, -1) : token
}

export const sourcedShellFilesInCommands = (
  commands: readonly string[],
  workspace: string
): readonly string[] => {
  const prefix = `${workspace}/`
  const found = new Set<string>()
  for (const command of commands) {
    for (const statement of command.split(STATEMENT_SEPARATOR)) {
      const matched = SOURCE_CAPTURE.safeParse(statement.trim().match(SOURCE_STATEMENT))
      if (!matched.success) continue
      const token = unquote(matched.data[1])
      if (!token.startsWith(prefix)) continue
      if (!token.endsWith(SHELL_SUFFIX)) continue
      if (token.includes("$")) continue
      const relative = token.slice(prefix.length)
      if (relative.split("/").includes("..")) continue
      found.add(relative)
    }
  }
  return [...found]
}

export const listSourcedShellFiles = async (repoRoot: string): Promise<readonly string[]> => {
  const instructionsRoot = rootFor(resolveRoots(), AKASHA)
  if (instructionsRoot === undefined) {
    throw new Error(
      "`resolveRoots()` names no `instructions` root, so the workflows whose commands source " +
        "shell files cannot be found"
    )
  }
  const sha = commitSha40("0".repeat(40))
  const ci = {
    workspace: RESOLUTION_WORKSPACE,
    commitSha: sha,
    treeSha: treeSha40("0".repeat(40)),
    shortSha: toShortSha7(sha),
    inputsHash: inputsHash12("000000000000"),
    seq: "0",
    branch: "main",
    changedFiles: [],
  }

  const found = new Set<string>()
  for (const workflow of await discoverWorkflows(instructionsRoot, { codeRoot: repoRoot })) {
    for (const step of workflow.steps ?? []) {
      const commands = typeof step.commands === "function" ? step.commands(ci) : step.commands
      for (const path of sourcedShellFilesInCommands(commands ?? [], RESOLUTION_WORKSPACE)) {
        found.add(path)
      }
    }
  }
  return [...found].sort()
}
