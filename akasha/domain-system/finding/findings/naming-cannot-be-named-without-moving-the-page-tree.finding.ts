import type { Finding } from "../finding.page-type.ts"

export const namingCannotBeNamedWithoutMovingThePageTree = {
  id: "01a05b6c-aa0a-7000-8d73-f8298800778c",
  pageTypeSlug: "finding",
  slug: "naming-cannot-be-named-without-moving-the-page-tree",
  domainSlug: "domain/akasha-migration",
  claim:
    "Four of the five unnamed repo-root folders are now named packages under `shared/`. The fifth, `page/name/naming/`, is not, and cannot be without moving `page/`. Naming that folder alone would close nothing: `naming.ts` would still reach `page/frontmatter.ts`, `page/text/text.ts` and `page/name/name.ts` by relative path, and `page/name/name.ts` carries 43 importers across the unpackaged `page/` tree. The call I took in Alan's absence: leave it, name the other four, and file this.",
  evidence:
    'One reach was blocked: `shared/pages-access/src/file-rows.ts:3` imports `idOfFilePage` and `slugOfFilePage` from `../../../page/name/naming/naming.ts`. Six more importers reach the same file from unpackaged trees: `ops-cli/global/write/state-id.ts` and five files under `tools/lib/`.\n\nThe closure those two functions need is small. `idOfFilePage` calls `idDerivedFrom`, which needs only `node:crypto`. `slugOfFilePage` calls `fileStemOf`, five lines of string slicing in `page/name/name.ts`. So a package holding just the file-page identity derivation would be about twenty-seven lines.\n\nWhat stops it is `page/name/name.ts`. It is 34 lines and self-contained, but 43 specifiers reach it, nearly all from inside `page/`. Moving it makes every one of those a repoint, which is packaging `page/`; a survey of `page/` counted 95 files with 42 escapes to 13 targets across 8 other unpackaged root folders. Duplicating `fileStemOf` into a new package instead was refused: `slugOfFilePage` and `idDerivedFrom` decide page identity and slug, and two copies of that logic can drift.\n\nA facade package re-exporting `naming.ts` was also refused, because that is the shape just deleted from `shared/design-tokens`, which held three one-line re-exports of a repo-root file and only compiled through `rootDir: "../.."`.\n\nWhat it would take: package `page/` itself, or move `page/name/name.ts`, `page/text/text.ts`, `page/frontmatter.ts` and `page/name/naming/naming.ts` together as one named unit and repoint the 43 reaches.',
} as const satisfies Finding
