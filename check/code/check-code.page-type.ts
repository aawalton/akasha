import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const checkCode = {
  id: "01a04bc4-7e86-7beb-8dfb-3666785dd3d5",
  type: "page-type",
  slug: "check-code",
  definition: "a module run over a change to judge whether it may land",
  parts: [
    "boolean-property/experimental",
    "boolean-property/runs-on-audit",
    "boolean-property/runs-on-change",
    "boolean-property/runs-on-deploy",
    "check-code/browser-code-reads-the-environment-by-a-name",
    "check-code/calculation-imports-only-types",
    "check-code/change-is-reached-through-a-runner",
    "check-code/change-reaches-its-own-target-type",
    "check-code/check-reaches-a-path-through-the-index",
    "check-code/client-reaches-a-server-module-through-a-route",
    "check-code/command-is-named-by-its-place-in-the-tree",
    "check-code/command-takes-its-arguments-through-one-reader",
    "check-code/command-taking-two-words-is-tested-from-words",
    "check-code/domain-is-named-by-a-parent",
    "check-code/email-address-is-well-formed",
    "check-code/extension-host-reaches-no-bun-code",
    "check-code/file-length",
    "check-code/folder-matches-a-shape",
    "check-code/global-declared-once",
    "check-code/hand-written-global-is-no-method",
    "check-code/held-addon-names-a-roster-addon",
    "check-code/id-is-a-uuid-version-7",
    "check-code/identifier-matches-its-place",
    "check-code/identifier-names-one-page",
    "check-code/index-answers-are-level-with-the-change",
    "check-code/index-is-level-with-the-pages",
    "check-code/instant-property-slug-closes-with-at",
    "check-code/introduced-property-is-a-part",
    "check-code/invariant-restated-on-a-part-narrows-it",
    "check-code/invariant-statement-is-plain",
    "check-code/key-names-one-property",
    "check-code/lint-clean",
    "check-code/manifest-lands-on-a-file",
    "check-code/manifest-names-what-is-reached",
    "check-code/module-sits-under-a-modules-folder",
    "check-code/name-format-judges-by-one-shape",
    "check-code/no-class",
    "check-code/no-code-comments",
    "check-code/no-color-literal",
    "check-code/no-enum-or-namespace",
    "check-code/no-global-in-a-module",
    "check-code/no-import-cycle",
    "check-code/no-index-path-spelled",
    "check-code/no-method-signature",
    "check-code/no-page-address-spelled",
    "check-code/no-raw-nul-bytes",
    "check-code/no-re-export",
    "check-code/no-refused-syntax",
    "check-code/no-relative-specifier",
    "check-code/no-rule-in-two-files",
    "check-code/no-second-spelling-of-a-name-format",
    "check-code/no-spacing-literal",
    "check-code/no-tmp",
    "check-code/no-unparsed-boundary-read",
    "check-code/no-unused-exports",
    "check-code/page-matches-its-type",
    "check-code/page-named-as-stated",
    "check-code/page-property-has-its-file",
    "check-code/parts-list-is-sorted",
    "check-code/phone-number-is-e164",
    "check-code/popover-keeps-its-viewport-cap",
    "check-code/property-is-declared-by-a-type",
    "check-code/relation-resolves",
    "check-code/repository-is-written-by-a-change",
    "check-code/require-import-extension",
    "check-code/restatement-narrows-something",
    "check-code/shell-clean",

    "check-code/tests-pass",
    "check-code/typecheck",
    "check-code/types-file-runs-nothing",
    "list/code-comment-forms",
    "module-property-group/audit",
    "module-property-group/check",
    "module-property-group/decision",
  ],
  extends: ["page-type/domain"],
  loadedBy: "module/checking",
  properties: [
    { pageProperty: "module-property-group/decision", required: false, many: false },
    { pageProperty: "module-property-group/check", required: false, many: false },
    { pageProperty: "module-property-group/audit", required: false, many: false },
    { pageProperty: "boolean-property/runs-on-change", required: true, many: false },
    { pageProperty: "boolean-property/runs-on-deploy", required: true, many: false },
    { pageProperty: "boolean-property/runs-on-audit", required: true, many: false },
    { pageProperty: "boolean-property/experimental", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check is handed the whole change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check decides for itself what work the change warrants.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check takes and gives paths under the root the check was given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check states each phase the check runs on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Audit is a phase like the other phases.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check states whether the check runs there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check running on no phase has landed and does not yet judge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That landing is how a check states its rule before that check binds anyone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A check the change turns on does not judge the change turning that check on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change phase judges only the paths a change has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check runs at change before the tree's violation count reaches zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Running at change has the count from rising while the rest stay fixed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file still with a violation is refused at change the next time that file is touched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal is the ratchet working rather than the check misfiring.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mortal page is outside that ratchet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check reads any path by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A check reads the checkout through the overlay for the paths that check cannot name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A check listing a folder lists it through the overlay, with the change's edits laid over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the change writes is among the files a check lists.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the change takes away is left out of the files a check lists.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A check reads the tree through the overlay, which reads it through the module that reads trees.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every check listing a folder lists it through the overlay.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The overlay's listing is reached from the shadow a check is handed.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
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
      directiveKind: "directive-kind/rule",
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
      directiveKind: "directive-kind/principle",
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
      directiveKind: "directive-kind/rule",
      name: "Dispatch Reach",
      act: "Run a check on every file class a violation it judges can arrive in.",
      warrant: "A check the breaking change never runs is clean on the very commit it exists for.",
      aids: [
        "Never dispatch from the files the check reads.",
        "Run it on a file removed, not just one written.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
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
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
