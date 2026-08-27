---
id: 730ae435-c4a5-519a-88db-8d10093c8a33
page-type-slug: finding
title: "The action box sender names no page, so the player action box cannot write"
domain-slug: domain/narrative-engine
---

# Claim

The awen action box submits every player action under a sender id that stands in no `pages` row, and `messages.sender_agent_id` is a foreign key onto `pages(id)`. Every submission is refused by the database, and every read of the action-box mailbox comes back empty whatever a player did.

# Evidence

Found on 2026-08-19 while moving `db-action-messages` out of the agents package. The id is `019ef9ea-83e2-707e-b1f3-3b70875a8e88`, the default `getActionBoxAgentId` parses when `AWEN_ACTION_BOX_AGENT_ID` is unset — and it is unset in every environment file and service unit in both repositories, so the default is the live value.

Three readings, taken against the cluster database that holds both the awen games and the fleet's messages:

- No `pages` row carries that id, deleted or otherwise.
- No `messages` row has ever carried it as `sender_agent_id`, over 6,549 rows.
- `messages_sender_agent_id_fkey` is `FOREIGN KEY (sender_agent_id) REFERENCES pages(id) ON DELETE SET NULL`, and an insert naming that id is refused with `23503`. This was observed directly rather than inferred.

So `deliverPlayerAction`, reached from `POST /api/action`, throws on every call, and the four readers — `getActionMessages` for the web action bar, `getActionMessageRows` for `ops awen rollback` and `ops awen clear-action`, `getActionMessageStamps` for `ops awen pacing`, and the clear `ops awen publish-turn` performs after a turn goes live — each answer over an empty set for every game.

Eight games stand with a coordinator bound, `the-tower` and `partners-ii` among them, so the mailbox is wired at both ends and broken only in the middle.

Whether the fix is to create the action box's page, to point the constant at a page that exists, or to drop the action box for a path that reaches the game master directly, this finding does not settle.
