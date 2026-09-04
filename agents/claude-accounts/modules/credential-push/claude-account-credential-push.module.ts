import type { Module } from "@akasha/code-system/module"

export const claudeAccountCredentialPush = {
  id: "01a0637b-78bb-72fd-8486-f9d3a8ac23e5",
  pageTypeSlug: "module",
  slug: "claude-account-credential-push",
  definition: "how a rotated credential reaches an account's sops file",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pair a push carries is the access token and the refresh token.",
    },
    {
      invariantKind: "departure",
      statement: "A push merges the pair into the keys the sops file already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file already holding the pair is answered as unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file answered as unchanged is landed again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A token that is empty is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A token holding a newline is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An expiry that is no moment a date holds is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A push whose expiry is no later than the expiry beside the page is answered as stale.",
    },
    {
      invariantKind: "departure",
      statement: "A push answered as stale writes no file.",
    },
    {
      invariantKind: "departure",
      statement: "A page beside which no expiry is written makes no push stale.",
    },
    {
      invariantKind: "departure",
      statement: "What landed is read back through sops and weighed against what was handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file reading back as other than what was handed in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every push that lands stamps the moment the access token expires.",
    },
    {
      invariantKind: "departure",
      statement: "A push that lands and does not stamp the expiry is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that does not carry the pair holds that pair beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A read-back that does not answer the pair holds that pair beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "The pair held beside the page is written under `rescuedCredential`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The file the pair is held in is narrowed to its owner before that pair is written.",
    },
    {
      invariantKind: "departure",
      statement: "A push that lands takes the rescued pair away.",
    },
    {
      invariantKind: "departure",
      statement: "A push answered as unchanged takes the rescued pair away.",
    },
    {
      invariantKind: "departure",
      statement: "An account name that is no lower kebab-case slug is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name refused for its shape is refused before a file is opened.",
    },
    {
      invariantKind: "departure",
      statement: "An account no page is filed for is answered as absent.",
    },
    {
      invariantKind: "departure",
      statement: "Every value written beside the page goes through the marking module.",
    },
    {
      invariantKind: "departure",
      statement: "Writing a push answers with an outcome rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "Pushing one account's credential opens that account's page and no other page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Pushing one account's credential lists no directory the accounts are filed under.",
    },
    {
      invariantKind: "constraint",
      statement: "The repository root reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The reader of an account's secrets reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The composer of an account's ciphertext reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The landing reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The reading of the index reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The reader of page bodies reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller names the account a push is written for.",
    },
    {
      invariantKind: "constraint",
      statement: "The moment an access token expires is handed in by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decrypts.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here encrypts.",
    },
    {
      invariantKind: "absence",
      statement: "No secret value reaches a log here.",
    },
    {
      invariantKind: "absence",
      statement: "No digest of a token is answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into a page's own body.",
    },
    {
      invariantKind: "absence",
      statement: "No reader of a page body is built here from the root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a second account to push the account named.",
    },
    {
      invariantKind: "gap",
      statement: "A rescued pair is held unencrypted in the file beside the page.",
    },
    {
      invariantKind: "gap",
      statement: "A pair landed in sops without its expiry stamp is unreachable by the reader.",
    },
    {
      invariantKind: "gap",
      statement: "Narrowing for a rescued pair narrows every other reading beside that page.",
    },
    {
      invariantKind: "gap",
      statement: "A pair rescued twice is written over by the second rescue.",
    },
    {
      invariantKind: "gap",
      statement: "Every mark a push writes reaches the account's page a second time.",
    },
    {
      invariantKind: "gap",
      statement:
        "Narrowing before the write is proven at a refused mark rather than at one that lands.",
    },
  ],
} as const satisfies Module
