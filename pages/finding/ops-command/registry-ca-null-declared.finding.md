---
id: 0fb741b8-2491-5cbe-a089-9525db4b8872
slug: registry-ca-null-declared
page-type-slug: finding
title: "Registry ca null declared"
domain-slug: page-type/ops-command
---

# Claim

`tools/commands/talos/config-gen.ts` declares `readRegistryCa` as returning `string | null`, where the function it names returns `string | undefined`. The declaration is what typecheck holds the caller to, so the wrong one is checked and passes.

# Evidence

`packages/infra/talos/src/lib/registry-ca.ts` reads `export function readRegistryCa(): string | undefined`, returning the file's contents where it exists and `undefined` where it does not.

The surface here declares `readonly readRegistryCa: () => string | null` and calls it as `readRegistryCa() ?? "<registry-ca-pem>"`. Nothing goes wrong today: `??` catches both, so the fallback fires either way and the emitted YAML is the same.

It was noticed while moving `ops talos apply`, which reaches the same function and tests its result with `=== undefined` rather than a coalesce — a caller declaring `null` and testing `undefined` would have compiled and never fired.
