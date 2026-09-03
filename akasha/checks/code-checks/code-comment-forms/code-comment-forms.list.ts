import type { List } from "../../domain-system/lists/list.page-type.ts"

export const codeCommentForms = {
  id: "01a06862-a02e-7a14-ace4-e8e871253c5c",
  pageTypeSlug: "list",
  slug: "code-comment-forms",
  definition: "the shapes of comment a program parses",
  members: [
    {
      memberName: "shebang",
      definition: "the kernel reads it on the first line to pick the interpreter",
    },
    {
      memberName: "expect-error",
      definition: "the compiler suppresses the error and fails where there is none",
    },
    {
      memberName: "biome suppression",
      definition: "biome skips the rule it names on the line below",
    },
    {
      memberName: "shellcheck directive",
      definition: "shellcheck takes the setting the comment names",
    },
    {
      memberName: "triple-slash reference",
      definition: "the compiler loads the file it names before this one",
    },
    {
      memberName: "no-self annotation",
      definition: "TypeScriptToLua compiles the file's functions without an implicit self",
    },
    { memberName: "deprecation", definition: "the language server marks every call site" },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Form Approval",
      act: "Show Alan each code comment form you would add, and take his ruling before adding the next.",
      warrant:
        "A form binds every file the domain naming this list reaches, and nothing re-reads it later.",
      aids: [
        "Never add a form to allow a comment you wrote.",
        "His silence is not a ruling; ask again or wait.",
      ],
    },
  ],
} as const satisfies List
