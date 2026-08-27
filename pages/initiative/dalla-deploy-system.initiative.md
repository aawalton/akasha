---
id: 01a0445a-9a11-7d2c-a4e8-bcfd256394d1
page-type-slug: initiative
slug: dalla-deploy-system
persona-slug: dalla
domain-slug: domain/deploy-system
parent-slug: aine-global
---

# Intent

- Every service can deploy through the deploy system.
- All services are deployed only using the `ops deploy` command.
- All files specific to the deploy system are in `akasha/deploy-system/`.
- A deploy carries one service, never the repository.
- Every file whose change could change a service's deploy is reachable from that service through the graph.
- A service deploys only when its closure has changed.
- The closure a service was deployed from is cached under `.git/deploy/`.
- A service deploys only where the checks in its closure are green.
- A service can deploy without waiting for any other.
