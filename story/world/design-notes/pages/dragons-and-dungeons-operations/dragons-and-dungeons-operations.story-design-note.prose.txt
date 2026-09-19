# Dragons & Dungeons — how this game is stored and played

The design document says what the world is. This one says how this particular game runs: its page layout, its reader, and the editors adopted for it. The engine behind all of it is game-agnostic and documented with Awen; what is written here is Dragons and nothing else.

## Storage

All game content lives as pages in the shared page store, written directly. There is no authored markdown directory and no docs-exporter for this game — Aria reads live state from the page store, never from files. This document is authored truth for people, not a read path for the game.

Each published chapter is **two rows** sharing the natural key `externalId: dnd-ch<chapterNumber>`:

| Page type | Role |
|---|---|
| `story` | one per game — the Dragons story row, `019ef225-1717-76f7-984a-e44d05e378b3` |
| `story-chapter` | pole 1 twin: `externalId`, `chapterNumber`, `text`, `wordCount`, `status`, story relation |
| `game-turn` | pole 2 twin: `externalId`, `turnNumber`, `text`, `wordCount`, `status`, `sessionNumber` |
| `story-wiki` | canon: kind and `chapterNumber`, written during the lore-keeping run |

**The two chapter twins share the `externalId` but carry different status vocabularies** — `Completed` on the `story-chapter`, `complete` on the `game-turn`. They are never interchanged.

On any page-write error: stop, report to Alan, idle. There is no manual fallback.

## The reader

Dragons plays in the browser through the Awen inline reader at `alanwalton.com/game/dragons-dungeons-92c712df`; `dragons.alanwalton.com` redirects there.

It is story-only — narrative and an action box, no HUD, no character sheet, no system window. The `tower-session`-backed HUD and sheet model is retired and is not to be assembled for this game.

It renders over the published `story-chapter` rows, so it continues the real campaign from actual state. It goes live with nothing new: the ordinary turn loop is the feed. Publishing a chapter puts it on the reader at the next poll — no deploy, no extra commit.

Alan's typed input on the reader arrives to Aria over the messages channel, the same boundary `ops agent send aria` writes to. An inbound action-box message is his in-world input for the current turn.

**Loop-dark.** The reader carries published, revealed chapter prose, titles and links — never coordinator insight or reaction, and never any internal loop rule.

## Sessions

The game row carries `currentSession`; each `game-turn` carries `sessionNumber`. The reader groups by them — the live view shows the current session's turns, and earlier sessions consolidate into one entry apiece.

The session bump is Aria's explicit act at a real session boundary, never per-turn and never automatic.

## Adopted editors

Six advisory editor lenses are adopted for this game, one resident seat per lens:

`facts` · `diction` · `patterns-reaction` · `patterns-telling` · `patterns-boundary` · `patterns-gestalt`

Advisory only — never a gate, never authoritative. Alan is the final reader.
