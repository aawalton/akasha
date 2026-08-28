---
page-type-slug: finding
title: "nothing guards the one repository import line"
domain-slug: repo/akasha-repo
---

# Claim

`pages/repo/akasha-repo.repo.md:21` states as Intent "No file here imports a file in another repository, apart from a type declaration", and no check judges that line any more — the only one that did, `import-reach`, was removed on 2026-08-27.

# Evidence

Read in the tree on 2026-08-28. The Intent line stands at `pages/repo/akasha-repo.repo.md:21`.

`6a1806ac8bc3459a6df0f816ecfb729a14b549af`, "Remove the import-reach check", 2026-08-27 18:59, deletes three files and 106 lines: the check page, its code attachment and its test. Nothing under `checks-system/check/` carries the name now. It went as obsolete: with one repository there is nowhere for an import to escape to, so a check policing the escape guards nothing.

The escapes it was holding were repaired first, in `caafc045525ee2612983f7cce6a3888bed3aa85c`, "Point four imports back inside the repository", 2026-08-27 18:57. That commit rewrites four import specifiers across four files: three `../../../../../../../akasha/day/day` forms in `shared/pages-ui/src/components/page-calendar.tsx`, `shared/pages-ui/src/property-types/rrule.tsx` and `shared/pages-ui/test/rrule.component.test.tsx`, each becoming a relative `day/day.ts`; and one `../../../../../code/packages/temper/shared/foundation-misc/dungeons/src` in `temper/shared-foundation-misc-dungeons/src/generated/temper-dungeons.generated.ts`, split into two imports naming the modules that declare `Dungeon` and `QuestGiver`. Four specifiers, five added lines because of that split. No other commit between the two touches an escaping import.

I read the Definition line of each of the fifteen checks under `checks-system/check/` and none reaches the Intent line: `inbound-import-resolves` judges the opposite direction, `import-resolves` whether a package here answers a specifier, `require-import-extension` the extension.

Not measured: whether any import escaping this repository stands in the tree today. I did not scan for one, so this says the guard is gone, not that the line is being broken.
