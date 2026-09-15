import type { Command } from "akasha/command/command.page-type.types.ts"

export const pageSecretShow = {
  id: "01a06812-3ce8-7f5f-b3d7-fce6fc2e94e5",
  type: "page-type/command",
  slug: "page-secret-show",
  definition: "the command answering with one of a page's secrets, decrypted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is refused before anything is decrypted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page's page type does not declare secret is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key the sops file does not hold is answered apart from a key the page type does not declare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is answered whole with nothing else beside that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sops file that will not decrypt is refused rather than read as empty.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a secret out of an earlier commit.",
    },
  ],
  name: "show",
  arguments: [
    { argument: "argument/file-path", required: true },
    { argument: "argument/key", required: true },
  ],
} as const satisfies Command
