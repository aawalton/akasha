---
id: 5e14433d-dccb-5e9a-a974-c1155018148a
page-type-slug: finding
title: "Bounded wait outside definition"
domain-slug: domain/code-quality
---

# Claim

Bounded Wait sits on `domains/code-quality.md` outside what that document's Definition covers. The Definition reads "how a body of code is organized and structured, and what has been left in it". Code Comments is what has been left in code and Domain Directory is how it is organized; a ceiling on a wait is behaviour under failure and is neither. Either the Definition is narrower than the domain it heads, or Bounded Wait belongs on another domain.

# Evidence

Raised by `claude-code-quality-archivist-review-instructions` during a review-instructions reading of `domains/code-quality.md` on 2026-08-09. That seat declined to pick between the two, placement being judgment, and reported that `bun tools/governs.ts` on a shared TypeScript file returns `domains/code-quality.md` — so this domain reaches every `.ts` and `.tsx` file in both repositories through `domains/file-kinds/typescript.md`, which argues the Definition is the narrow half.

The filing seat confirmed the Definition and all three rules read as described at `domains/code-quality.md`. Not measured: which of the two resolutions is right, whether another domain would take Bounded Wait, and the `governs.ts` result, which is that seat's measurement rather than this one's.
