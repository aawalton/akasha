import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountCredentialPush = {
  id: "01a0637b-78bb-72fd-8486-f9d3a8ac23e5",
  type: "page-type/module",
  slug: "model-account-credential-push",
  definition: "how a rotated credential reaches an account's sops file",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pair a push carries is the access token and the refresh token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push merges the pair into the keys the sops file already has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops file already with the pair is answered as unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops file answered as unchanged is landed again by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token that is empty is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token with a newline is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An expiry that is no moment a date holds is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A push whose expiry is no later than the expiry beside the page is answered as stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push answered as stale writes no file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page beside which no expiry is written makes no push stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The file that landed is read back through sops and weighed against the pair handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops file reading back a different pair from the pair handed in is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every push that lands stamps the moment the access token expires.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that lands and does not stamp the expiry is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change adding a file writes the sops file rather than an edit composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that does not have the pair has that pair beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read-back that does not answer the pair has that pair beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pair held beside the page is written under `rescuedCredential`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The file the pair is held in is narrowed to its owner before that pair is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that lands takes the rescued pair away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push answered as unchanged takes the rescued pair away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account name that is no lower kebab-case slug is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name refused for its shape is refused before a file is opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account no page is filed for is answered as absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every value written beside the page goes through the marking module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Writing a push answers with an outcome rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that threw after it committed names that commit in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that threw has the pair beside the page as a refused landing does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rescue that throws is said rather than thrown, so a push still answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Pushing one account's credential opens that account's page and no other page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Pushing one account's credential lists no directory the accounts are filed under.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reader of an account's secrets reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The composer of an account's ciphertext reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The landing reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reading of the index reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reader of page bodies reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller names the account a push is written for.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The moment an access token expires is handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decrypts.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here encrypts.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No secret value reaches a log here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No digest of a token is answered.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes into a page's own body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No reader of a page body is built here from the root.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a second account to push the account named.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A rescued pair is held unencrypted in the file beside the page.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A pair landed in sops without its expiry stamp is unreachable by the reader.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Narrowing for a rescued pair narrows every other reading beside that page.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A pair rescued twice is written over by the second rescue.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every mark a push writes reaches the account's page a second time.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "Narrowing before the write is proven at a refused mark rather than at a mark that lands.",
    },
  ],
} as const satisfies Module
