---
page-type-slug: question
id: 019fbb20-ba2b-72dd-8ad2-04e4750f12a6
title: "Should a generated `# Glossary` count against the 15,000-byte door ceiling? It has now cut a child domain's own definition to make room, and two domains are close to being unwritable."
slug: should-a-generated-glossary-count-against-the-15-000-byte-do
status: dismissed
source-context: "019fba68-7d7f-7283-960d-10abb0f97555"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "Exempt generated sections from the ceiling"
  - "Give knowledge and code-repo intermediate parent domains to fan children across"
  - "Raise the ceiling"
  - "Leave it — the squeeze is the forcing function"
---
Overtaken by events, not answered. The generated # Glossary no longer exists: tools/glossary.ts composes what lives under a domain at the moment of asking and writes nothing, its own docblock recording that the list 'is worth having and was never worth storing'. So nothing generated counts against the ceiling. Measured 2026-08-02: the largest perimeter surface is tasks/build-change.md at 8,357 bytes against the 15,000 ceiling, and no domain is near unwritable. Closed by athena-lead.
