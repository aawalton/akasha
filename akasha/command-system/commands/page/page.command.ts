import type { Command } from "../command.page-type.ts"

export const page = {
  id: "01a06809-a802-7b19-8731-bc8f0d1b66ac",
  pageTypeSlug: "command",
  slug: "page",
  definition: "the command acting on what stands beside a page rather than inside it",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "secret", takes: "what to act on, which is a value a page's own files do not reveal" },
    {
      said: "show",
      takes: "the act, which is to name the keys held beside a page and the keys declared",
    },
    { said: "reveal", takes: "the act, which is to decrypt one secret and answer with its value" },
    {
      said: "set",
      takes: "the act, which is to encipher one value into the sops file beside a page",
    },
    { said: "clear", takes: "the act, which is to drop one secret and land what is left" },
    {
      said: "--file-path <path>",
      takes: "the page acted on rather than its sops file, read against the root",
    },
    { said: "--key <name>", takes: "the one secret an act names, which a show takes none of" },
    {
      said: "--message <msg>",
      takes: "what the commit is for, where the one naming the sops file will not do",
    },
  ],
  helpNotes: [
    "the words stand in order, and one call names one act.",
    "a value is piped in rather than said as an argument, since an argument stands in the process table and in whatever recorded the call.",
    "one trailing newline is dropped, since that is what a shell adds, and a value holding a newline of its own is refused.",
    "which keys a page may hold is its page type's call: a key it does not declare secret is refused naming the ones it does.",
    "a show decrypts nothing, since which keys a sops file holds is readable without the key that would open them.",
    "a reveal writes nothing and the value reaches the report in the clear, so whatever takes the report decides where it then stands.",
    "a key that was the last one the sops file held takes the file with it.",
    "what a clear drops is not coming back through any act here, so name what a page holds with a show before dropping anything.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What to act on is the first word and the act is the second.",
    },
    {
      invariantKind: "departure",
      statement: "A page's secret values stand in one sops file beside that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which keys a page may hold is declared by that page's type rather than said here.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type does not declare secret is refused before anything is read.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled here as the page type's own key rather than as its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A value arrives piped in rather than as an argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "One trailing newline is dropped and a value holding a newline of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key that was the last one the sops file held takes the file with it.",
    },
    {
      invariantKind: "departure",
      statement: "A key the sops file does not hold is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page standing at no path here is answered apart from a word this does not take.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a secret out of an earlier commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decrypts a page to say which keys that page holds.",
    },
    {
      invariantKind: "absence",
      statement: "No value this takes is ever written anywhere in the clear.",
    },
    {
      invariantKind: "gap",
      statement: "What is composed is not decrypted again before it lands.",
    },
    {
      invariantKind: "gap",
      statement: "Several secrets valid only as a pair land in a commit each rather than in one.",
    },
  ],
} as const satisfies Command
