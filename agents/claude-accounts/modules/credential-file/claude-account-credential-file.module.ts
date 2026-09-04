import type { Module } from "@akasha/code-system/module"

export const claudeAccountCredentialFile = {
  id: "01a0686d-236a-7000-8b8f-acbdc729fc69",
  pageTypeSlug: "module",
  slug: "claude-account-credential-file",
  definition: "the credential file a signed-in agent reads, kept level with the account's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A credential file is named `.credentials.json` inside the directory it is given.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that cannot be read, cannot be parsed, or names an empty access token reads as no credential.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write of an empty access token or an empty refresh token leaves the file as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A write keeps every key the file already held beside its `claudeAiOauth`.",
    },
    {
      invariantKind: "departure",
      statement: "A written file is readable by the owner and by nobody else.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh takes what the account's page holds and asks nothing of the network.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refresh whose page credential expires no later than the file's leaves the file as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A credential that has already expired is not written to the file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A credential expiring inside the reader's buffer is written, and the lateness is said.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that faults is said and thrown on rather than swallowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A push whose credential resolves to an upstream account another page is pinned to is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A push that is refused throws rather than answering that it pushed.",
    },
    {
      invariantKind: "departure",
      statement: "A file naming no `claudeAiOauth` is not pushed to the page.",
    },
    {
      invariantKind: "departure",
      statement: "A run of writes settles for two seconds before one push is made of it.",
    },
    {
      invariantKind: "departure",
      statement: "A write the watch made itself is not pushed back to the page.",
    },
    {
      invariantKind: "departure",
      statement: "An empty file is never pushed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file whose expiry moved out is pushed even for an account the caller says to skip.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped watch leaves neither a poll nor a pending push behind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says a line except through a door.",
    },
    {
      invariantKind: "gap",
      statement: "A refusal to write an empty token is silent, because the writer takes no door.",
    },
  ],
} as const satisfies Module
