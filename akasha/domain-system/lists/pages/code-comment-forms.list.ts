import type { List } from "../list.page-type.ts"

export const codeCommentForms = {
  id: "01a06869-a968-7f72-8398-efb271253c5c",
  pageTypeSlug: "list",
  slug: "code-comment-forms",
  definition: "the shapes of comment a program parses",
  directives: [
    {
      directiveKind: "rule",
      name: "Form Approval",
      act: "Show Alan each code comment form you would add, and take his ruling before the next.",
      warrant:
        "A form binds every file the domain naming this list reaches, and nothing re-reads it.",
      aids: [
        "Never add a form to allow a comment you wrote.",
        "His silence is not a ruling; ask again or wait.",
      ],
    },
  ],
  members: [
    {
      memberName: "shebang",
      definition: "`#!` on the first line, which the kernel reads to pick the interpreter",
    },
    {
      memberName: "expect-error",
      definition: "`@ts-expect-error`, which suppresses the error and fails where there is none",
    },
    {
      memberName: "biome suppression",
      definition: "`biome-ignore`, which skips the rule it names on the line below",
    },
    {
      memberName: "shellcheck directive",
      definition:
        "`shellcheck` then `disable`, `enable`, `source`, `source-path`, `shell` or `external-sources`",
    },
    {
      memberName: "triple-slash reference",
      definition: "`/// <reference …>`, which loads the file it names before this one",
    },
    {
      memberName: "no-self annotation",
      definition: "`@noSelfInFile`, which compiles the file's functions without an implicit `self`",
    },
    {
      memberName: "deprecation",
      definition: "`@deprecated`, which the language server marks every call site for",
    },
  ],
} as const satisfies List
