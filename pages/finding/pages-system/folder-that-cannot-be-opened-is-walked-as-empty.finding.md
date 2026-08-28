---
page-type-slug: finding
slug: folder-that-cannot-be-opened-is-walked-as-empty
title: "A folder the store's walk cannot open is walked as a folder holding no page, and the answer says nothing about it"
domain-slug: domain/pages-system
---

# Claim

`pages-system/store/files.ts` walks a folder it cannot open as a folder holding no page. `entriesIn` catches every error `readdirSync` raises and answers an empty list, so `pagesUnder` answers fewer pages and nothing in that answer says a folder was missed. A caller cannot tell a page type with no pages from a page type whose pages stood behind a folder that would not open. A hold placed above this store would hold the short answer and serve it until something dropped it.

# Evidence

`pages-system/store/files.ts:46-52`, at 9649d03b22:

```ts
const entriesIn = (dir: string) => {
  try {
    return readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
}
```

`pagesUnder` (`:60-81`) walks with it and `sidecarsOf` (`:139-158`) lists with it. Neither answer carries anything saying a folder was skipped. `pagesUnder`'s own comment (`:57-58`) draws the neighbouring distinction — a kind asked for and not found answers an empty list "so a caller need not tell 'no pages of that kind' from 'did not ask'" — beside this one, which it cannot draw.

Reproduced against a root holding two pages, one under `pages/domain/` and one under `pages/shut/`:

- both folders readable: `pagesUnder(root, {"domain"})` answers 2 pages
- `pages/shut` at mode 000: the same call answers 1 page, and refuses nothing

Positive controls, each differing in the argument alone: `pagesUnder(root, {"domain"})` answers 2 pages where `pagesUnder(root, {"domain-that-no-page-type-declares"})` answers 0; `statedAt(root, <a page that stands>)` answers 5 keys where `statedAt(root, <a path holding no file>)` answers a refusal string.

The store's other reads do distinguish. `statedAt` (`:101-121`) answers a string where it could not read, and `pageAt` (`pages-system/store/store.ts:235-249`, same commit) answers `Unread`. The walk is the one read here that does not.

Not established: whether any folder under a repository root is unreadable today. What makes the branch reachable without a permission fault is a corpus moving under concurrent writers — a folder renamed between the `readdir` of its parent and the `readdir` of itself raises `ENOENT` and is walked as empty by the same catch.
