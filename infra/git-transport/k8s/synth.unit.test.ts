import { describe, expect, test } from "bun:test"
import { requireMatch } from "@shared/utils-narrow/validate"
import { z } from "zod"
import { deploymentYaml } from "../synth-deployment"

const CODE_REPO = "/data/git/repositories/alan/code.git"
const INSTRUCTIONS_REPO = "/data/git/repositories/alan/instructions.git"
const BOOKS_REPO = "/data/git/repositories/alan/books.git"
const MEMORY_REPO = "/data/git/repositories/alan/memory.git"
const STORIES_REPO = "/data/git/repositories/alan/stories.git"
const CODE_EDITOR_REPO = "/data/git/repositories/alan/code-editor.git"
const AKASHA_REPO = "/data/git/repositories/alan/akasha.git"
const CODE_MIRROR_URL = "https://github.com/aawalton/code.git"
const INSTRUCTIONS_MIRROR_URL = "https://github.com/aawalton/instructions.git"
const BOOKS_MIRROR_URL = "https://github.com/aawalton/books.git"
const MEMORY_MIRROR_URL = "https://github.com/aawalton/memory.git"
const STORIES_MIRROR_URL = "https://github.com/aawalton/stories.git"
const CODE_EDITOR_MIRROR_URL = "https://github.com/aawalton/code-editor.git"
const AKASHA_MIRROR_URL = "https://github.com/aawalton/akasha.git"

const APPEND_ONLY_POLICY = "pre-receive-main-append-only"
const PROJECT_BRANCH_POLICY = "pre-receive"

const REPO_DECLARATION = /^(?<repo>\w+_REPO)=\/data\/git\/repositories\//
const HOOK_SYMLINK =
  /^ln -sfn \S+\/(?<policy>[\w-]+) "\$(?<repo>\w+_REPO)\/hooks\/(?<hook>[\w-]+)"$/
const MIRROR_DECLARATION = /^git config -f "\$(?<repo>\w+_REPO)\/config" mirror\.url (?<url>\S+)$/
const BARE_INIT = /^git init --bare --initial-branch=main "\$(?<repo>\w+_REPO)"$/

const RepoDeclaration = z.object({ repo: z.string() })
const HookSymlink = z.object({ policy: z.string(), repo: z.string(), hook: z.string() })
const MirrorDeclaration = z.object({ repo: z.string(), url: z.string() })
const BareInit = z.object({ repo: z.string() })

const trimmedLines = (yaml: string): readonly string[] =>
  yaml.split("\n").map((line) => line.trim())

const commandsStartingWith = (yaml: string, prefix: string): readonly string[] =>
  trimmedLines(yaml).filter((line) => line.startsWith(prefix))

const linesContaining = (yaml: string, needle: string): readonly string[] =>
  yaml.split("\n").filter((line) => line.includes(needle))

const parsed = <T extends z.ZodTypeAny>(
  yaml: string,
  pattern: RegExp,
  schema: T
): readonly z.infer<T>[] =>
  trimmedLines(yaml)
    .filter((line) => pattern.test(line))
    .map((line) => requireMatch(pattern, schema, line))

const declaredRepos = (yaml: string): readonly string[] =>
  parsed(yaml, REPO_DECLARATION, RepoDeclaration).map((m) => m.repo)

const reposWithHook = (yaml: string, hook: string): readonly string[] =>
  parsed(yaml, HOOK_SYMLINK, HookSymlink)
    .filter((m) => m.hook === hook)
    .map((m) => m.repo)

const policyOf = (yaml: string, repo: string): string | undefined =>
  parsed(yaml, HOOK_SYMLINK, HookSymlink).find((m) => m.repo === repo && m.hook === "pre-receive")
    ?.policy

const mirrorDeclarations = (yaml: string): ReadonlyMap<string, string> =>
  new Map(parsed(yaml, MIRROR_DECLARATION, MirrorDeclaration).map((m) => [m.repo, m.url]))

describe("git-transport bare-repo provisioning", () => {
  test("provisions every bare repo", () => {
    const yaml = deploymentYaml()
    expect(yaml).toContain(CODE_REPO)
    expect(yaml).toContain(INSTRUCTIONS_REPO)
    expect(yaml).toContain(BOOKS_REPO)
    expect(yaml).toContain(MEMORY_REPO)
    expect(yaml).toContain(STORIES_REPO)
    expect(yaml).toContain(CODE_EDITOR_REPO)
    expect(yaml).toContain(AKASHA_REPO)
    expect(declaredRepos(yaml)).toEqual([
      "CODE_REPO",
      "INSTRUCTIONS_REPO",
      "BOOKS_REPO",
      "MEMORY_REPO",
      "STORIES_REPO",
      "CODE_EDITOR_REPO",
      "AKASHA_REPO",
    ])
  })

  test("creates the workstation-authority repos empty rather than cloning them", () => {
    const yaml = deploymentYaml()
    const inits = commandsStartingWith(yaml, "git init --bare --initial-branch=main")
    expect(inits.map((line) => requireMatch(BARE_INIT, BareInit, line).repo).sort()).toEqual([
      "AKASHA_REPO",
      "BOOKS_REPO",
      "CODE_EDITOR_REPO",
      "INSTRUCTIONS_REPO",
      "MEMORY_REPO",
      "STORIES_REPO",
    ])
  })

  test("a repo carries the mirror hook if and only if it declares a destination", () => {
    const yaml = deploymentYaml()
    const mirrored = [...mirrorDeclarations(yaml).keys()].sort()
    expect(mirrored.length).toBeGreaterThan(0)
    expect([...reposWithHook(yaml, "post-receive")].sort()).toEqual(mirrored)
  })

  test("each repo's declared destination is its own GitHub mirror", () => {
    const declarations = mirrorDeclarations(deploymentYaml())
    expect(declarations.get("CODE_REPO")).toBe(CODE_MIRROR_URL)
    expect(declarations.get("INSTRUCTIONS_REPO")).toBe(INSTRUCTIONS_MIRROR_URL)
    expect(declarations.get("BOOKS_REPO")).toBe(BOOKS_MIRROR_URL)
    expect(declarations.get("MEMORY_REPO")).toBe(MEMORY_MIRROR_URL)
    expect(declarations.get("STORIES_REPO")).toBe(STORIES_MIRROR_URL)
    expect(declarations.get("CODE_EDITOR_REPO")).toBe(CODE_EDITOR_MIRROR_URL)
    expect(declarations.get("AKASHA_REPO")).toBe(AKASHA_MIRROR_URL)
  })

  test("every provisioned repo declares an off-node destination", () => {
    const yaml = deploymentYaml()
    expect([...mirrorDeclarations(yaml).keys()].sort()).toEqual([...declaredRepos(yaml)].sort())
  })

  test("no two repos declare the same destination", () => {
    const destinations = [...mirrorDeclarations(deploymentYaml()).values()]
    expect(new Set(destinations).size).toBe(destinations.length)
  })

  test("no container hands a mirror destination to the hooks", () => {
    const yaml = deploymentYaml()
    expect(linesContaining(yaml, "GITHUB_MIRROR_URL")).toEqual([])
    for (const url of [
      CODE_MIRROR_URL,
      INSTRUCTIONS_MIRROR_URL,
      BOOKS_MIRROR_URL,
      MEMORY_MIRROR_URL,
      STORIES_MIRROR_URL,
      CODE_EDITOR_MIRROR_URL,
      AKASHA_MIRROR_URL,
    ]) {
      const occurrences = linesContaining(yaml, url)
      expect(occurrences.length).toBeGreaterThan(0)
      for (const line of occurrences) {
        expect(line).not.toContain("value:")
      }
    }
  })

  test("every repo's push policy is named where its hook is installed", () => {
    const yaml = deploymentYaml()
    expect([...reposWithHook(yaml, "pre-receive")].sort()).toEqual([...declaredRepos(yaml)].sort())
    expect(policyOf(yaml, "CODE_REPO")).toBe(APPEND_ONLY_POLICY)
    expect(policyOf(yaml, "INSTRUCTIONS_REPO")).toBe(APPEND_ONLY_POLICY)
    expect(policyOf(yaml, "BOOKS_REPO")).toBe(APPEND_ONLY_POLICY)
    expect(policyOf(yaml, "MEMORY_REPO")).toBe(APPEND_ONLY_POLICY)
    expect(policyOf(yaml, "STORIES_REPO")).toBe(APPEND_ONLY_POLICY)
    expect(policyOf(yaml, "CODE_EDITOR_REPO")).toBe(APPEND_ONLY_POLICY)
    expect(policyOf(yaml, "AKASHA_REPO")).toBe(APPEND_ONLY_POLICY)
  })

  test("the pod shares one PID namespace, so an orphaned mirror is reaped", () => {
    expect(trimmedLines(deploymentYaml())).toContain("shareProcessNamespace: true")
  })

  test("no recursive delete names a repo with no upstream to re-clone from", () => {
    const deletes = commandsStartingWith(deploymentYaml(), "rm -rf")
    expect(deletes.length).toBeGreaterThan(0)
    for (const line of deletes) {
      const noUpstream = [
        "INSTRUCTIONS_REPO",
        "instructions.git",
        "BOOKS_REPO",
        "books.git",
        "MEMORY_REPO",
        "memory.git",
        "STORIES_REPO",
        "stories.git",
        "CODE_EDITOR_REPO",
        "code-editor.git",
        "AKASHA_REPO",
        "akasha.git",
      ]
      for (const name of noUpstream) {
        expect(line).not.toContain(name)
      }
    }
  })
})
