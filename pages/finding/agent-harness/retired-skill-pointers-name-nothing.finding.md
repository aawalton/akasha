---
id: f45d5622-7b34-5c97-b6fe-441b10ad6e30
page-type-slug: finding
title: "Retired skill pointers name nothing"
domain-slug: domain/agent-harness
---

# Claim

Two of the four replacements the retired-skill guard offers name a document that exists in no repository. An agent whose prompt opens with a retired skill slug is refused and sent to read something unfindable, so the refusal costs it a search that cannot end. The guard's job is to replace a husk with a live route, and for half its entries the route is another husk.

# Evidence

Measured 2026-08-19 against all three repositories.

`tools/lib/skill-token-guard.ts:3-8` holds the whole table:

    const RETIRED_SKILL_REPLACEMENTS: Readonly<Record<string, string>> = {
      p: "/manage (parent project) or /deliver (child project)",
      "amy-calendar": "read Calendar Management",
      domain: "/lead",
      images: "read packages/infra/inference/docs/image-generation.md",
    }

The two that point at a document both miss. `grep -rn "Calendar Management"` over the instructions, code and memory repositories returns two lines and no document: the table entry itself and `tools/tests/skill-token-guard.test.ts:55`, which asserts the string reaches the reason. `packages/infra/inference/docs/image-generation.md` does not exist in the code repository.

The two that point at a command are a different shape and were not measured here: `p` offers `/manage` and `/deliver`, and `domain` offers `/lead`.

Nothing reports it. The guard's own test asserts the refusal carries the replacement string, never that the string names something reachable, so a green run says the pointer is intact when only its spelling is.

Not measured: how often an agent's prompt actually opens with `amy-calendar` or `images`, and whether either document existed when its entry was written.
