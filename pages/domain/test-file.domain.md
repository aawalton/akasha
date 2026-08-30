---
id: 0939c9cc-b271-551a-a0ce-ab28da07d741
page-type-slug: domain
title: "Test file"
slug: test-file
domain-parent-slug: file-kind-domain/file-kind-ts
required-reading-slugs:
  - domain/test
  - domain/file-naming-tests
  - domain/file-arrangement-tests
---

# Definition

- **Test file** — a file holding tests.

# Design

The DOM shim a test runs in drops `set-cookie` from a `Response`, where the runtime it stands for keeps it.

`mock.restore()` leaves a `mock.module` replacement standing.

A module namespace object is mutated in place when its module is mocked, so a reference taken beforehand holds the stub rather than what stood there.

A `beforeAll` is charged against the same bound as a case, so setup too slow for a case is too slow for a hook.
