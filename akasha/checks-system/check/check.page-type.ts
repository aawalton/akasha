import type { Module } from "../../code-system/module/module.page-type.ts"
import type { Test } from "../../code-system/module/properties/test.file-property.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { RunsOnAudit } from "./properties/runs-on-audit.boolean-property.ts"
import type { RunsOnDeploy } from "./properties/runs-on-deploy.boolean-property.ts"
import type { RunsOnPatch } from "./properties/runs-on-patch.boolean-property.ts"
import type { RunsOnWorktree } from "./properties/runs-on-worktree.boolean-property.ts"

export type Check = Module & {
  test: Test
  runsOnPatch: RunsOnPatch
  runsOnWorktree: RunsOnWorktree
  runsOnDeploy: RunsOnDeploy
  runsOnAudit: RunsOnAudit
}

export const check = {
  id: "01a04bc4-7e86-7beb-8dfb-3666785dd3d5",
  pageTypeSlug: "page-type",
  slug: "check",
  definition: "a module run over a change to judge whether it may land",
  extendsSlug: "page-type/module",
  properties: [
    { pagePropertySlug: "test", required: true, many: false },
    { pagePropertySlug: "runs-on-patch", required: true, many: false },
    { pagePropertySlug: "runs-on-worktree", required: true, many: false },
    { pagePropertySlug: "runs-on-deploy", required: true, many: false },
    { pagePropertySlug: "runs-on-audit", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A check is handed the whole change, and decides for itself what work the change warrants.",
    },
    {
      invariantKind: "departure",
      statement: "A check judges the code, never its author.",
    },
    {
      invariantKind: "departure",
      statement: "A check takes and gives paths under the root it was given.",
    },
    {
      invariantKind: "departure",
      statement: "A check states each phase it runs on.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is a phase like any other, and a check states whether it runs there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check running on no phase has landed and does not yet judge, which is how a check states its rule before it binds anyone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Patch judges only the paths a change carries, so it is turned on before zero: it holds the count from rising while the rest are fixed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Patch on means a file still carrying a violation is refused the next time it is touched, which is the ratchet working rather than the check misfiring.",
    },
    {
      invariantKind: "gap",
      statement: "A check looks for no files.",
    },
    {
      invariantKind: "gap",
      statement:
        "A check that must know more than the change it was handed asks the index, never the tree.",
    },
    {
      invariantKind: "gap",
      statement: "A check's phases are derived from what it reads.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves",
      act: "Add a check to akasha only where Alan has approved that check.",
      warrant:
        "A check binds every writer on every change, and a wrong one costs more than what it guards.",
      aids: [
        "Approving the initiative is not approving a check.",
        "A check replacing an old one still needs approval.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Fail Closed",
      act: "Fail a check that could not run.",
      warrant:
        "A check that could not look verified nothing, so passing it lets a change land unjudged.",
      aids: [
        "A check that threw could not run.",
        "Never answer for a check by catching its error.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Zero At Turning On",
      act: "Fix every violation a check finds before it judges the whole tree, never freezing them into a list.",
      warrant:
        "A check judging the whole tree while its defects stand reads green and blocks nobody.",
      aids: [
        "Turning the whole-tree phases on before zero stops every writer at once.",
        "A check may land with every phase off, which claims nothing and hides nothing.",
        "Landing it off puts the rule up for argument before it binds anyone.",
        "Never narrow a judging check's reach to make the count zero.",
        "Where zero is out of reach, leave the whole-tree phases off until it is not.",
      ],
    },
  ],
} as const satisfies PageType
