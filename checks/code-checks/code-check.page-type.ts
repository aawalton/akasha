import type { Module } from "@akasha/code-system/module"
import type { Test } from "@akasha/code-system/module/test"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Entries } from "./properties/entries.file-property.ts"
import type { RunsOnAudit } from "./properties/runs-on-audit.boolean-property.ts"
import type { RunsOnDeploy } from "./properties/runs-on-deploy.boolean-property.ts"
import type { RunsOnPatch } from "./properties/runs-on-patch.boolean-property.ts"
import type { RunsOnWorktree } from "./properties/runs-on-worktree.boolean-property.ts"

export type CodeCheck = Module & {
  test: Test
  runsOnPatch: RunsOnPatch
  runsOnWorktree: RunsOnWorktree
  runsOnDeploy: RunsOnDeploy
  runsOnAudit: RunsOnAudit
  entries?: Entries
}

export const codeCheck = {
  id: "01a04bc4-7e86-7beb-8dfb-3666785dd3d5",
  pageTypeSlug: "page-type",
  slug: "code-check",
  definition: "a module run over a change to judge whether it may land",
  pluralSlug: "code-checks",
  partSlugs: [
    "boolean-property/runs-on-audit",
    "list/code-comment-forms",
    "boolean-property/runs-on-deploy",
    "boolean-property/runs-on-patch",
    "boolean-property/runs-on-worktree",
    "file-property/entries",
    "record-property/measured",
    "text-property/at-commit",
    "number-property/one-path-ms",
    "number-property/one-path-bytes",
    "number-property/whole-tree-ms",
    "number-property/whole-tree-bytes",
    "code-check/domain-is-named-by-a-parent",
    "code-check/email-address-is-well-formed",
    "code-check/file-has-its-page",
    "code-check/file-length",
    "code-check/folder-matches-a-shape",
    "code-check/global-declared-once",
    "code-check/id-is-a-uuid-version-7",
    "code-check/identifier-matches-its-place",
    "code-check/identifier-names-one-page",
    "code-check/instant-property-slug-closes-with-at",
    "code-check/introduced-property-is-a-part",
    "code-check/key-names-one-property",
    "code-check/lint-clean",
    "code-check/manifest-lands-on-a-file",
    "code-check/manifest-names-what-is-reached",
    "code-check/name-format-judges-by-one-shape",
    "code-check/no-class",
    "code-check/no-code-comments",
    "code-check/no-enum-or-namespace",
    "code-check/no-global-in-a-module",
    "code-check/no-import-cycle",
    "code-check/no-index-path-spelled",
    "code-check/no-method-signature",
    "code-check/no-raw-nul-bytes",
    "code-check/no-re-export",
    "code-check/no-refused-syntax",
    "code-check/no-rule-in-two-files",
    "code-check/no-second-spelling-of-a-name-format",
    "code-check/no-tmp",
    "code-check/package-reached-where-named",
    "code-check/page-matches-its-type",
    "code-check/page-named-as-stated",
    "code-check/page-property-has-its-file",
    "code-check/phone-number-is-e164",
    "code-check/property-is-declared-by-a-type",
    "code-check/relation-resolves",
    "code-check/require-import-extension",
    "code-check/restatement-narrows-something",
    "code-check/shell-clean",
    "code-check/invariant-statement-is-plain",
    "code-check/tests-pass",
    "code-check/typecheck",
    "code-check/typescript-7",
  ],
  extendsSlug: ["page-type/module"],
  loadedBySlug: "module/checking",
  properties: [
    { pagePropertySlug: "test", required: true, many: false },
    { pagePropertySlug: "runs-on-patch", required: true, many: false },
    { pagePropertySlug: "runs-on-worktree", required: true, many: false },
    { pagePropertySlug: "runs-on-deploy", required: true, many: false },
    { pagePropertySlug: "runs-on-audit", required: true, many: false },
    {
      pagePropertySlug: "entries",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check is handed the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A check decides for itself what work the change warrants.",
    },
    {
      invariantKind: "departure",
      statement: "A check takes and gives paths under the root the check was given.",
    },
    {
      invariantKind: "departure",
      statement: "A check states each phase the check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is a phase like any other.",
    },
    {
      invariantKind: "departure",
      statement: "A check states whether the check runs there.",
    },
    {
      invariantKind: "departure",
      statement: "A check running on no phase has landed and does not yet judge.",
    },
    {
      invariantKind: "departure",
      statement: "That is how a check states its rule before it binds anyone.",
    },
    {
      invariantKind: "departure",
      statement: "Patch judges only the paths a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "Patch turns on before the tree's violation count reaches zero.",
    },
    {
      invariantKind: "departure",
      statement: "Patch holds the count from rising while the rest stay fixed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Patch on means a file still carrying a violation is refused the next time it is touched.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is the ratchet working rather than the check misfiring.",
    },
    {
      invariantKind: "departure",
      statement: "A check reads any path by name.",
    },
    {
      invariantKind: "departure",
      statement: "A check asks the index for paths the check cannot name.",
    },
    {
      invariantKind: "stopgap",
      statement: "A check looks for no files.",
    },
    {
      invariantKind: "gap",
      statement: "A check reaching for the tree does not land.",
    },
    {
      invariantKind: "gap",
      statement: "A check's phases are derived from what the check reads.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves Checks",
      act: "Add a check to akasha only where Alan has approved that check.",
      warrant:
        "A check binds every writer on every change, and a wrong one costs more than what it guards.",
      aids: [
        "Approving the initiative is not approving a check.",
        "A check replacing an old one still needs approval.",
        "Widening what an approved check reaches needs none.",
        "How an approved check reads needs none.",
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
      name: "Trust The Index",
      act: "Read what the index answers without checking it against the tree.",
      warrant: "Every check guarding the index apart hides one root cause behind many symptoms.",
      aids: [
        "A wrong index is a root cause to fix, not a case each check handles.",
        "An index that cannot answer refuses where it is read, not in the check.",
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
    {
      directiveKind: "principle",
      name: "Change Reach",
      act: "Limit what a check measures to what the provisional change could invalidate.",
      warrant:
        "An audit pays for its reach once a run; a check pays on every change, by every author.",
      aids: [
        "Never scope a check to what the diff touched.",
        "Reach the whole repo where a change can break it.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Dispatch Reach",
      act: "Run a check on every file class a violation it judges can arrive in.",
      warrant: "A check the breaking change never runs is clean on the very commit it exists for.",
      aids: [
        "Never dispatch from the files the check reads.",
        "Run it on a file removed, not just one written.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Derived Reach",
      act: "Derive a check's reach wherever a new member can arrive, never from a list in the check.",
      warrant:
        "The member arriving after the list was written is the one the check exists to catch.",
      aids: [
        "A list moved out of the check is still a list.",
        "Never take a big count for a whole reach.",
      ],
    },
  ],
} as const satisfies PageType
