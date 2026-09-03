---
page-type-slug: question
id: 019fbb51-e62d-7e6e-bfe1-42537b3a3318
title: "`knowledge.schema.md` asks `code-path:` to reach every file whose change would falsify the document, and in the same section forbids the wide globs that would actually do it. Six readings tonight have found those two requirements jointly unsatisfiable. Which one gives?"
slug: knowledge-schema-md-asks-code-path-to-reach-every-file-whose
status: dismissed
source-context: "019fba68-7d7f-7283-960d-10abb0f97555"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "Reach gives: the key is a best-effort commit-time net, and the schema stops promising edit-time completeness"
  - "The sentence gives: a claim whose falsifiers no admissible glob reaches may not be asserted by this kind — a check holds it, or nothing does"
  - "Split the key: a narrow glob for delivery, plus a declared list of known-unreachable falsifiers"
  - "Leave it open tonight — keep recording instances, I will rule later"
---
Overtaken by events, not answered. knowledge.schema.md no longer exists — schemas are typed at tools/document/schemas/*.ts, and knowledge.ts carries no section forbidding wide globs; code-path: is now simply 'inherited optional' in a two-line comment. The corpus the question was protecting is empty: knowledge/ holds 0 documents, so nothing is accumulating inconsistent keys. If code-tree ingestion restarts, re-ask against the typed schema rather than reviving this. Closed by athena-lead.
