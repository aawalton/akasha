---
id: e7451347-b0ae-51e0-a36d-aefc655eed53
page-type-slug: finding
title: "Contacts readonly guard omits verify"
domain-slug: domain/code-quality
---

# Claim

The one assertion enforcing `@alanwalton/contacts`' read-path-is-read-only invariant guards a literal list of four SQL builders and omits the fifth, `buildVerifySql` — which the same test file imports and tests only for quote escaping — so a mutation keyword added to the read-back query would go unguarded by the check that exists to catch exactly that.

# Evidence

`packages/alanwalton/contacts/src/lib/contact-sql.unit.test.ts` opens `describe("read SQL is strictly read-only")` and builds its subject at line 14 as a literal list:

    const all = [buildRecordSql(), buildPhoneSql(), buildEmailSql(), buildAddressSql()].join("\n")

Line 16 is the assertion: `expect(all).not.toMatch(/\b(INSERT|UPDATE|DELETE|DROP|REPLACE|ALTER|CREATE)\b/i)`.

`contact-sql.ts` exports five SQL builders. The fifth is `buildVerifySql`, at `:92` in `buildVerifyScript`'s neighbourhood, emitting `SELECT r.ZUNIQUEID AS uid … FROM ZABCDRECORD r WHERE r.ZUNIQUEID = '${idLiteral}'`. It is not in `all`.

The omission is not for want of the symbol being in scope. The same test file imports `buildVerifySql` at line 10 and exercises it at line 43 — `expect(buildVerifySql("a'b:ABPerson")).toContain("ZUNIQUEID = 'a''b:ABPerson'")` — which tests quote escaping and says nothing about mutation keywords.

What the assertion guards matters because it is the only mechanical half of an invariant whose stated failure mode is severe. Every write in this package goes through `osascript` driving Contacts.app; there is no SQLite write path at all, and the five `sqlite3` invocations in `contact-sql.ts` (`:67`, `:68`, `:69`, `:70`, `:99`) are each `/usr/bin/sqlite3 -json "$db" "$sql"` against one of the five read SQLs. `:99` is the verify script's, so the unguarded builder is on a live path rather than a dead one.

The package's quarantined head document stated the invariant this assertion partly enforces — "Writes go through Contacts.app via osascript — NEVER a direct AddressBook SQLite write … Mutating the abcddb directly races iCloud sync and can corrupt the contact store across every device" — and is queued for removal, which is why this is filed here. The three write verbs' registered help each still carry "never a direct SQLite write".

Not measured: I did not run the suite, and I did not check whether other packages' read-only assertions take the same literal-list shape.

Read at `main`, 2026-08-08.
