---
id: 1a13df2c-bdbe-54f7-9dac-04d8ec3619e0
slug: page-type-help-cites-missing-doc
page-type-slug: finding
title: "Page type help cites missing doc"
domain-slug: domain/pages-system
---

# Claim

Two `ops page-type` verbs send their caller to a document that does not exist, in `--help` prose rather than in a comment, and six more source files cite it or `URL Conventions` the same way.

# Evidence

`packages/shared/pages/cli/src/page-type/create.ts:17` ends its naming paragraph with "See Naming Conventions (Page-Type Names & Domain Prefixes)." `page-type/update.ts:23` ends its own with the same sentence. Both strings are `CommandHelp` prose, so they are printed to whoever runs `ops page-type create --help` or `update --help` — this is a live surface directing a reader somewhere, not a comment between maintainers.

There is nowhere to go. No document named Naming Conventions stands in a live form: `dirty/docs/naming-conventions.md` has already been swept, and `domains/` declares no such domain. The same is now true of URL Conventions — `dirty/docs/url-conventions.md` was ingested block by block and removed, with nothing kept.

Six more source files cite one of the two. For Naming Conventions: `infra/checks/src/checks/check-ci-naming-conventions.ts:10` ("Rules (cf. Naming Conventions § \"CI Workflows & Steps\")"), `infra/checks/src/lib/functional-type-purity-scan.ts:129`, and `shared/pages/access/src/domain-title-prefix.ts:7` ("The full convention lives in Naming Conventions (Page-Type Names & Domain Prefixes)"). For URL Conventions: `alanwalton/web/app/push/lib/push-routing.ts:11`, `infra/checks/src/checks/check-page-type-slug-validity.ts:7` ("See URL Conventions"), and `infra/checks/src/lib/ts-page-type-slug-validity.ts:27` ("The full prescriptive rule lives in URL Conventions").

Two of those are a gate and its pure core deferring their warrant to the missing document, which is the same shape as a `--help` line: a reader is told the rule is written down somewhere and it is not.

The rules themselves are not lost, which is why this is a citation question. `domain-title-prefix.ts` holds `TEMPER_SLUG_PREFIX`, `TEMPER_TITLE_PREFIX` and `TEMPER_UNPREFIXED_SLUGS`, and `validateTemperTitlePrefix` throws; `page-type-sequence-name.ts` holds `SEQUENCE_NAME_PATTERN` and `pagesSeqName` throws. Each cite points past a working mechanism at prose that is gone.
