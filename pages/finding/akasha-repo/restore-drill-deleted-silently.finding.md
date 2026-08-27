---
id: 3a8f3549-49ec-541f-9741-e3f616639ed2
slug: restore-drill-deleted-silently
page-type-slug: finding
title: "Restore drill deleted silently"
domain-slug: repo/akasha-repo
---

# Claim

Nothing rebuilds akasha from its remote. The drill that once did was deleted by a refactor whose message does not mention it, and no successor was written, so the recovery path for everything tracked is untested and unwritten.

# Evidence

`ops` lists no restore verb. The only clones in the tree are CI checkout steps, which fetch a bare copy to run a pipeline against and never rebuild a working tree anyone goes on to use.

The drill was built deliberately, and its own commit gave the reason: a recovery path that lives inside what it recovers dies with it. It was removed by a refactor whose message names the other capabilities it knew were going, and names restore, the drill and recovery nowhere.

That reason binds harder now than when the drill was written. akasha absorbed every other repository, so a recovery path kept here is inside the thing it would be recovering, and there is no second tree to run it from.

The asymmetry is what makes this worth filing: a backup never restored and no backup at all are indistinguishable until either is needed. The repository has a remote and an off-cluster mirror, so the copies exist; what does not exist is any evidence they can be turned back into a working tree.
