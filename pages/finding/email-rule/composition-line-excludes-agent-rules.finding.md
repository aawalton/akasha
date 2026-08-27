---
id: d4cd6b6e-7164-5938-8f37-7f09fddba73f
page-type-slug: finding
title: "Composition line excludes agent rules"
domain-slug: rules-engine-rule-set/email-rule
---

# Claim

The Design line "An email rule is a match, the actions to take, a mode and a kind" on `domains/email-rule.md` names a part an agent rule does not have. `tools/document/schemas/email-rule-agent.ts` gives one `frontmatter: [mode, ruledOn]` and `sections: [match, judgment]`, with no `actions:` key to hold, and the actions gate reports not-applicable on `email/alan/rules/agent/everything-else.md`. Six of Alan's thirty-four rules are agent rules.

# Evidence

Raised by the seat that read `domains/email-rule.md` on 2026-08-13 under `review-instructions`, and relayed here rather than re-derived: the schema, the gate's verdict and the count of six are that seat's, and I opened none of them.

Its recommendation, which nobody has ruled on, is to cut the line rather than repair it: "a match, a mode and a kind" would be true of both kinds and would still be a composition list, which is not one of the three kinds `domains/domain-design.md` admits, and each part is already bound once — on the three child domains and on `email-action`, with the schema in front of every rule author by gate.

It reports the line as cited by nothing: the two references to `domains/email-rule.md` in the repository both cite its filing requirement, which stands.

It landed no change, Design being a section `domains/domain.md` reserves to Alan. Nothing here measures whether a rule author has written an agent rule wrong for reading the line.
