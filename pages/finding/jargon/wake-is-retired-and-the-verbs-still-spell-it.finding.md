---
id: 5cd858d1-385a-5846-a438-0f4402c9ed2a
slug: wake-is-retired-and-the-verbs-still-spell-it
page-type-slug: finding
title: "Wake is retired and the verbs still spell it"
domain-slug: barred-meaning/jargon
---

# Claim

`wake` stands retired as a domain while it is one of the system's live mechanisms, spelled into two `ops` verbs, a required flag value, several code modules and a hook. The registry says the word is gone; the machinery a seat must operate says it is the word. A reader who looks it up is told to stop writing what every command in front of them is called.

# Evidence

MEASURED 2026-08-07, prompted by ryn running `ops project rule --seq 18075 --rail wake` guidance minutes after reading the entry that retires the word.

WHAT THE ENTRY SAYS. `domains/retired/wake.md` — now `pages/barred-meaning/wake.barred-meaning.md`, word for word — reads "**Wake** — a message that earned the start of a stopped seat; now any message starts one." It names no replacement, so a reader cannot learn from it what to write instead; it records a change in the mechanism and stops.

WHAT THE MECHANISM ACTUALLY SPELLS. `ops seat held-wake` and `ops seat outbound-wake` are live verbs. `ops project rule` takes `--rail <wake|record>` as a REQUIRED flag with no default, so a seat filing a ruling must type the retired word to act at all. In the code repo the word is an identifier: `wake-armed-seats.ts` and its unit test, `wake-watcher-registry.ts`, `wakeSources` on a helper row, and exports carried through `routing-core/src/index.ts`. In the instructions repo it stands in `tools/hooks/block-headless-halt.sh` fifteen times, in `hold-contract.ts`, and in `domains/tasks/general/loop.md`.

WHERE THE MECHANISM SPELLS IT NOW. Re-measured 2026-08-27 in akasha, which absorbed both roots. Half the specimen is gone: no `ops` command spells `wake` at all, so `ops seat held-wake` and `ops seat outbound-wake` are retired, and `ops project rule --rail <wake|record>` is gone with the whole `ops project` namespace — a seat no longer has to type the barred word to act. The identifiers stand: `tools/lib/decide-wake-match.ts`, `tools/lib/persona-wake-slugs.ts`, `tools/lib/wake-armed-specs.ts` and `tools/lib/wake-comms-input.ts` all name the barred sense, and `wakeSources` is carried through `tools/lib/recipient-resolver-registry.ts`. `tools/hooks/block-headless-halt.sh` is gone. `alanwalton/health-samples-day/src/wake-day.ts` and `pages/domain/wake-day.domain.md` are the other sense, which the barred meaning does not reach.

WHY THIS IS DIFFERENT FROM AN UNSWEPT RETIREMENT. `retirement-never-swept` records that most entries name a replacement that never happened, and the remedy there is to sweep. Here the remedy may be the opposite: the word names a live mechanism precisely, the fleet's own verbs are built on it, and the entry looks like the thing that is wrong. The initiative states the case — an entry whose replacement the system does not carry waits for the change making it true, and sweeping toward a word nothing uses makes the corpus lie about a live mechanism.

WHAT IS NOT ESTABLISHED. Whether the retirement should be reversed, re-scoped to the narrow sense the entry names, or kept with a replacement finally chosen. That is a ruling rather than a measurement, and it needs Alan: reversing a retirement is not a rewording.
