---
id: 285adb83-a028-5936-a741-b1d15f1581ae
page-type-slug: finding
title: "Unbound types are the value model gap"
domain-slug: domain/pages-system
---

# Claim

The four type names carrying no rule are not an oversight to be cleared: they are what lets a structured value into frontmatter at all. `judgeFrontmatter` consults the rule first and skips the non-string refusal when there is none, so `blocks:`, `slots:` and `choices:` are admitted BECAUSE their types are unbound. Binding them under the rule shape that stands, which reads text alone, would refuse every page type in the repo.

# Evidence

Measured on 2026-08-14 against `tools/lib/page-frontmatter.ts` as it stands.

The order in `judgeFrontmatter` is what decides it:

```
const { rule, why } = ruleFor(stated, vocabulary)
if (rule === null) {
  unjudged.push(`\`${key}\`: ${why}`)
  continue
}
const value = fm.fields.get(key)
if (typeof value !== "string") {
  const held = Array.isArray(value) ? "a list" : "a map"
  refusals.push(`\`${key}\` holds ${held} where \`${stated}\` states ${rule.says}`)
  continue
}
```

A missing rule takes the `continue` on the line above, so the non-string refusal is never reached. A `Rule` is `{ says, holds: (text: string) => boolean }` — it is handed text and can be handed nothing else.

So the two facts stand together: a key holding a map passes only while its type is unbound, and the moment a rule exists for that type the same key is refused for holding a map. `properties/page-type/blocks.md`, `slots.md` and `choices.md` all hold maps, and `properties/page/body.md` holds the body.

`property-types-bind` reports the four as `fail` and is right to. What the number cannot say is that no rule can be written for three of them without widening `Rule` beyond text, which is the same widening the list type needs and the same one six of the domain kind's thirteen keys need.

The consequence for sequencing: this check goes green when the frontmatter value model admits structured values, and not before. Clearing it any sooner means an allowlist, a softened verdict, or a rule that refuses the corpus — and the first two are the failure the check was built to prevent.

`template` is the odd one of the four. It carries `properties/page/body.md`, the body of every page, which is not frontmatter at all, so it wants a different answer from the other three.
