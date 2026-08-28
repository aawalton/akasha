---
page-type-slug: finding
title: "An instrument that reads a missing input as a definite answer invents faults where the default falls toward refusing"
domain-slug: domain/agent-harness
slug: absence-read-as-an-answer
---

# Claim

Three instruments in unrelated systems read absence as a definite answer rather than as no answer: a missing set as `nothing pending`, a missing constraint as `everything forbidden`, an unreadable body as `it names nothing`. None was written; each fell out of a default and reads at its own site as the careful branch. A default that under-reports leaves a fault standing to be found. One that over-reports invents faults, and a repair armed behind it then acts on its own error.
# Evidence

Three instances found on 2026-08-26, by three agents, in code none of them shared.

`groundOf` carried a commit-keyed disk cache. Dropping `pending` from what it carried left `?? 0` to read a missing set as nothing pending.

A package-conversion checker read a `package.json` with no `exports` field as a package exporting nothing, and reported every specifier naming it as unresolved. `@shared/cli` had no such field and was healthy: without one, every internal path resolves. The repair added `"exports": {"./*": "./src/*.ts"}`, a whitelist, which invalidated `@shared/cli/src/ops/provenance` — five days old and reached by `tools/ops/code.ts`. The whole `ops` CLI stopped resolving and no seat could read or write until `e2748216f1`. Re-run with the rule the right way round: 6,624 specifiers, 0 unresolved. There had been nothing to repair.

`akasha/checks/check/relation-resolves/relation-resolves.ts` does `const { fm, why } = blockOf(text); if (why !== null) continue`, so a page whose frontmatter is reached but does not parse is passed. Its ancestor `instructions/tools/gates/relations-resolve.ts:91-96` refused the same page. Both were run over one input; a control without the unparseable line yields the expected failure, so the difference is the deferral and not the lookup. That deferral became correct at `9eca21d`, when `page-holds-to-its-type` stopped discarding its own reason and took ownership of whether frontmatter reads at all.

The third was found only because the old version was still on disk to compare against, and it was on disk only because it had not yet been deleted.

Its author wrote a second instrument that day, after filing this: it followed `export *` into a module it could not resolve, kept the names found so far, and treated that set as complete. Knowing the shape did not prevent writing it again.

The shape of check with no such direction to test is bound by `finding/instrument-kind/an-outcome-shaped-check-cannot-inherit-the-rules-blind-spot`.