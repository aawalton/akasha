---
page-type-slug: finding
title: "Splitting a file left both copies live, and the repository imports from each"
domain-slug: domain/file-structure
slug: one-parser-declared-twice
---

# Claim

Three functions are declared twice in akasha, and the repository is split between the two copies rather than having moved from one to the other.

`textAt`, `blockOf` and `stringAt` are declared in `page/page-types.ts` and again in `page/text/text.ts`. Neither copy forwards to the other and neither is dead: eleven files import the three names from `page-types.ts`, and twenty-two import them from `text/text.ts`. Several files import from both.

The two copies have already diverged. `blockOf` differs by a line break in `page-types.ts:118-121` against `page/text/text.ts:16-18`, so the bodies are no longer the same text, only the same behaviour.

Nothing in the repository reports this. `export-declared-here` refuses a file that exports a name it did not declare, which is the re-export case; a name declared twice from source in two files passes it, because each file did declare what it exports.

# Evidence

Measured at akasha HEAD on 2026-08-26.

`git grep -n "export function \(textAt\|blockOf\|stringAt\)" -- '*.ts'` returns six declarations:

    page/page-types.ts:110  textAt
    page/page-types.ts:118  blockOf
    page/page-types.ts:125  stringAt
    page/text/text.ts:8     textAt
    page/text/text.ts:16    blockOf
    page/text/text.ts:24    stringAt

The importers are split. Taking the three names together, these files import at least one from `page/page-types.ts`: `checks-system/check/page-holds-to-its-type/staged-tree.ts`, `checks-system/check/page-holds-to-its-type/rows.ts`, `page/file-tree.ts`, `page/property/computed.ts`, `page/property/declarations.ts`, `page/property/frontmatter.ts`, `page/property/judge.ts`, `page/property/record.ts`, `page/shape/chain.ts`. These import at least one from `page/text/text.ts`: `agent/command/read/conditional/read-conditional.ts`, `agent/command/read/required/read-required.ts`, `agent/required-reading/required-reading.ts`, `checks-system/check/page-named-as-stated/page-named-as-stated.ts`, `checks-system/check/read-before-write/read-before-write.ts`, `checks-system/check/read-what-is-required/read-what-is-required.ts`, `graph/edge-producer/extension/extension.ts`, `graph/edge-producer/frontmatter/frontmatter.ts`, `graph/edge-producer/path/path.ts`, `graph/edge-producer/typescript/typescript.ts`, `graph/frontmatter-at/frontmatter-at.ts`, `graph/page-type-above/page-type-above.ts`, `page/index/build.ts`, `page/index/claim/claim.ts`, `page/index/identity/identity.ts`, `page/index/relation/relation.ts`, `page/name/naming/naming.ts`, `page/required-reading/address-here/address-index.ts`, `page/required-reading/required-reading.ts`, `page/required-reading/warrant/warrant.ts`, `readouts/readout-catalog.ts`.

`checks-system/check/page-holds-to-its-type/rows.ts`, `page/index/identity/identity.ts`, `page/name/naming/naming.ts` and `readouts/readout-catalog.ts` each reach both files.

Diffing the two declaration ranges shows one textual difference in `blockOf`, where `page-types.ts` holds the guard on one line and `text/text.ts` breaks it across two. `page-types.ts` additionally declares `StatedPageType` inside the same range, which `text/text.ts` does not carry.

The duplication was landed during the file-arrangement pass of 2026-08-26, in the commit that added `page/text/text.ts`. The pass removed akasha's ten re-exports earlier the same day and added `export-declared-here` to refuse new ones. A re-export would have been refused here; two declarations were not.

No repair was attempted and no importer was repointed. Which copy should survive is a reading: `page/text/text.ts` has the larger share of importers and the folder word that fits, and `page/page-types.ts` carries `StatedPageType` alongside, which would have to go somewhere first.
