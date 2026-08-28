---
id: 6242d01b-65f6-58e1-9268-7bc9aa727585
page-type-slug: initiative
slug: nimue-akasha-repo
persona-slug: nimue
domain-slug: repo/akasha-repo
parent-slug: aine-global
---

# Intent

- No references to the old repos remain in akasha.

# Notes

## Scope

`code` and `instructions` are retired as repositories, and the bare repos are not to be deleted from the remote. References under `pages/finding/` are out of scope.

## The meter

```
bun infra/cluster-checks/src/checks/check-instruction-references.ts --repo-root /var/home/walton/repos/akasha
```

It reads every tracked text file and matches on shape rather than on a list of spellings, so it finds references nobody knew to look for. It refuses without `--repo-root`, so a bare run reports no violations without having looked at anything.

Delete the check once it reads zero outside `pages/finding/`.
