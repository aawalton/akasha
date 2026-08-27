---
id: 01a0445a-9a11-7d2c-a4e8-bcfd256394d1
page-type-slug: initiative
slug: dalla-deploy-system
persona-slug: dalla
domain-slug: domain/deploy-system
parent-slug: aine-global
---

# Intent

- Every deployed service has a page.
- Every service can deploy through the deploy system.
- A deploy carries one service, never the repository.
- Every file whose change could change a service's deploy is reachable from that service through the graph.
- A service deploys only on a change that could change what it runs.
- A service can deploy without waiting for any other.
- A check that can run on a worktree passes before the service is deployed.
