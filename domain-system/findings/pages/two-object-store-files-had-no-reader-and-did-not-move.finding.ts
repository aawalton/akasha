import type { Finding } from "../finding.page-type.ts"

export const twoObjectStoreFilesHadNoReaderAndDidNotMove = {
  id: "01a05ccd-11cd-74a5-91e7-c99958c6ade4",
  pageTypeSlug: "finding",
  slug: "two-object-store-files-had-no-reader-and-did-not-move",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two of the nine tracked files in shared/object-store, src/fetch-stub.ts and src/object-store/test-helpers.ts, were reached by nothing in the tree. Both are scaffolding for tests deleted before tonight. Neither came across into @akasha/object-store, which landed as five modules rather than seven.",
  evidence:
    "Resolving every specifier in `git ls-files` to an absolute path and bucketing by owning package: shared/object-store answered 14 distinct importing files over 23 statements, every one naming it bare as `@shared/object-store` or `@shared/object-store/keys`, and 0 by relative path. Those two specifiers resolve through its exports map onto src/object-store.ts and src/keys.ts alone. Nothing resolved onto src/fetch-stub.ts or src/object-store/test-helpers.ts, and no specifier of the form `@shared/object-store/fetch-stub` stands anywhere. Its 7 internal edges run from multipart.ts and object-store.ts onto config, keys, sigv4 and multipart, and neither orphan is among their targets. Its gitignored dist/ still holds declaration files for src/keys.unit.test, src/multipart.smoke.test and four more under src/object-store/, none of which stands in the tracked tree, and those deleted tests are what the two files were written for. The call taken: five modules landed — object-store-key, s3-signing, s3-multipart, seaweedfs-config and seaweedfs-store — and the two orphans were not written in, so shared/object-store went at 03e0533dd1 with nothing carrying them. Reviving either means reviving its test first. The hand-rolled sigv4 came across into s3-signing unchanged.",
} as const satisfies Finding
