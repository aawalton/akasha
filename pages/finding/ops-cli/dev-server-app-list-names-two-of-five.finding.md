---
id: d8498136-cd25-5cb8-bbf5-e9872b292b22
slug: dev-server-app-list-names-two-of-five
page-type-slug: finding
title: "Dev server app list names two of five"
domain-slug: domain/ops-cli
---

# Claim

Every `--app` flag across the `dev-server` namespace describes its value as "App identifier (one of: alanwalton, temper)", and the app registry the verbs actually read holds five. The verbs' own refusal text prints all five, so the help contradicts the error message the same invocation produces.

# Evidence

Found 2026-08-13 by the seat moving the `dev-server` verb bodies into the instructions repository, reading `packages/agents/dev-server/cli/src/lib/dev-server-ops.ts` against the help blocks at `tools/commands/dev-server/*.ts`.

`APP_REGISTRY` in that file declares `alanwalton`, `audhdalan`, `temper`, `archive-of-worlds` and `atlas`. The `--app` description in `bootstrap`, `logs`, `start`, `status` and `stop` names two of them.

The contradiction is reachable in one invocation. `ops dev-server bootstrap --seq 16091 --app nosuchapp` refuses with `unknown app: nosuchapp (known: alanwalton, audhdalan, temper, archive-of-worlds, atlas)` — that list is built from `APP_NAMES` at the moment of refusal, so it cannot drift, while the help beside it names two. A reader who trusts the help believes `audhdalan`, `archive-of-worlds` and `atlas` are not available.

Live state files carry app names outside the registry entirely (`tower`, `idle` appear in `ops dev-server list` output), so the registry is not the only source of app names in play either.

What makes it worth filing rather than fixing in place: the help blocks under `tools/commands/dev-server/` were landed byte-identical to what the code repository declared, and the body move was required to leave the declared surface untouched so a repair could not be mistaken for the move. Repairing it here alone would make the two spellings disagree.
