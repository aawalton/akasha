---
id: e6a55413-42d4-5f1a-ad7d-72c37b27da6b
slug: armour-slot-unrendered
page-type-slug: finding
title: "Armour slot unrendered"
domain-slug: domain/global
---

# Claim

The Tower's browser display drops the player's armour row. `toRevealedSheet` emits the armour slot as
`cloak`, the live session state carries one, and the renderer's slot table has no `cloak` key — so
once any twelve-slot key is present the armour is filtered out and only what is in hand renders.
Nothing reports it: both halves validate, and an absent equipment row is exactly what the renderer
shows for a slot deliberately left empty.

# Evidence

Measured 2026-08-08 in `~/code` at `main` on tracked files, and in the live game tree at
`~/agents/iris/litrpg/`, which sits outside all seven repositories.

`revealed-sheet.ts:124`, inside `toRevealedSheet`:

    equipment.cloak = { name: armor.name, def: armor.def }

asserted at `revealed-sheet.unit.test.ts:88`. The live `display/state.json` carries `sheet.equipment`
as `{"mainHand": {…}, "cloak": {"name": "Stalker hide cloak", "def": 1}}`.

The renderer is `~/agents/iris/litrpg/display/index.html`. Its slot table, line 515:

    const EQ_SLOTS=[
      ["mainHand","Main Hand"],["offHand","Off Hand"],
      ["neck","Neck"],["ring1","Ring"],["ring2","Ring"],
      ["head","Head"],["shoulders","Shoulders"],["chest","Chest"],
      ["hands","Hands"],["waist","Waist"],["legs","Legs"],["feet","Feet"],
    ];

Twelve keys, no `cloak`. `eqRows` immediately below:

    const isNew=EQ_SLOTS.some(([k])=>k in eq);
    const filled=isNew
      ? EQ_SLOTS.filter(([k])=>eq[k]!=null).map(([k,label])=>[label,eq[k]])
      : [["Main Hand",eq.weapon],["Armor",eq.armor]].filter(([,it])=>it!=null);

`mainHand` is present, so `isNew` is true and the legacy branch — the only one reading an armour
field — never runs, and the filter keeps enumerated keys only.

`rg -n "cloak"` over that file exits 1: a clean nothing on a real file with a real pattern.

Why nothing surfaces it: the comment above `EQ_SLOTS` states the intent as "only FILLED slots render;
empty slots are hidden entirely". A dropped row and a hidden empty slot are the same absence. No
mechanism named by `ops enforcement list` compares the renderer's table against the projection's keys.

Found while emptying `dirty/code/packages-alanwalton-tower-docs-sheet-schema.md`, which is queued for
removal, so the observation would go with it.
