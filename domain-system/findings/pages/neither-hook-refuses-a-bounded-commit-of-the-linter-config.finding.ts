import type { Finding } from "../finding.page-type.ts"

export const neitherHookRefusesABoundedCommitOfTheLinterConfig = {
  id: "01a061b8-8b04-731b-ba15-97477cd91554",
  pageTypeSlug: "finding",
  slug: "neither-hook-refuses-a-bounded-commit-of-the-linter-config",
  domainSlug: "workspace-package/hook-system",
  claim:
    "A seat held that no agent could commit the linter's config, `block-biome` refusing any call carrying its file name and `block-git-writes` refusing any commit it cannot resolve. Both halves are false. `block-biome` reads only the first word of a segment, so a git call naming the config is no biome call, and `block-git-writes` lets a commit through when every path after `--` is outside `akasha/`. That second hook's refusal text prescribes the exact form.",
  evidence:
    "`biomeIn` at block-biome.agent-hook.code.ts:88-95 takes `calledWords(segment)`, reads `words[0]` alone, and asks whether its basename is `biome` or whether a runner precedes `biome`. No later word is read. `basenameOf` of the config's name is the whole name, which is not `biome`. Measured: `git log --oneline -1 -- <config>` ran and answered `8144afdeee`; `git add --dry-run -- <config>` ran and answered `add`. `bounded` at block-git-writes.agent-hook.code.ts:170-176 answers true when `--` is present and every path after it satisfies `outsideAkasha`, which asks only that the path is non-empty, is not one of `. .. ./ / *`, does not begin `..` or `:`, holds no `*`, and carries no `akasha` path segment. The config sits at the repository root and satisfies all of those. OVER_ACTS at :31-32 prints `For a commit reaching nothing under akasha/, name its paths after --` and then the filled-in form. Landed that way at 3f6d6e3be5, one file, six insertions, and `git status` for that path came back empty. The seat that reported the deadlock withdrew a subagent it had sent to split the literal, which was the right call about a wrong premise: the guard it was dodging was never engaged.",
} as const satisfies Finding
