import type { Finding } from "../finding.page-type.ts"

export const theCliPackageCarriedADeadSecondCopyOfAliasSnapshot = {
  id: "01a05c9d-dccf-7550-b163-3c27dba83335",
  pageTypeSlug: "finding",
  slug: "the-cli-package-carried-a-dead-second-copy-of-alias-snapshot",
  domainSlug: "domain/akasha-migration",
  claim:
    "`shared/cli` held two modules and only one was reached. `src/aw/init/alias-snapshot.ts` was a second copy of `tools/aw/init/alias-snapshot.ts`, exporting the same two names over the same file at the same path, and nothing anywhere imported it through the package. It was left behind rather than carried into akasha, so `@akasha/checkout-provenance` is the one module that was reached.",
  evidence:
    "`shared/cli` exported `./*` over `src/`, and one specifier naming it stood in the tracked tree: `tools/ops/code.ts:2` reaches `@shared/cli/ops/provenance`. Nothing reached `@shared/cli/aw/init/alias-snapshot`, by that name or any other.\n\nThe live copy is `tools/aw/init/alias-snapshot.ts`, which `tools/aw/cli.ts:3` imports relatively as `./init/alias-snapshot.ts` and `tools/aw/init/bash.ts:1` takes `AliasEntry` from. A third stands at `tools/lib/alias-snapshot.ts`, reached by `tools/commands/claude-account/add.ts:5` and `sync-aliases.ts:5`.\n\n`diff` of the shared copy against the tools copy shows one difference of substance: the shared one parses with zod, the tools one with a hand-rolled narrowing. Both export `AliasEntry`, `ACCOUNT_ALIAS_SNAPSHOT_PATH` and `readAliasSnapshot`, both read `~/.claude/account-aliases.json`, and both sort by `aliasIndex`.\n\nThe call taken was to land only `provenance` and let the two copies outside akasha stand. Nothing was deleted from `tools/`. Whether the tools pair should collapse into one, and whether that one belongs in akasha, is not settled here.",
} as const satisfies Finding
