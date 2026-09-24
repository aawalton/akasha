import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/jenny-home/jenny-home.route.code.tsx"),
    route("requests", "routes/jenny-requests/jenny-requests.route.code.tsx"),
  ]),
  route("handover", "routes/jenny-handover/jenny-handover.route.code.ts"),
  route("sign-in", "routes/jenny-sign-in/jenny-sign-in.route.code.ts"),
  route("sign-out", "routes/jenny-sign-out/jenny-sign-out.route.code.ts"),
  route("api/health", "routes/jenny-api-health/jenny-api-health.route.code.ts"),
  route("api/live-version", "routes/jenny-api-live-version/jenny-api-live-version.route.code.ts"),
  route("api/categorization", "routes/jenny-categorization/jenny-categorization.route.code.ts"),
  route("api/cost", "routes/jenny-cost/jenny-cost.route.code.ts"),
  route("api/readout-relay", "routes/jenny-readout-relay/jenny-readout-relay.route.code.ts"),
  route("api/safety-level", "routes/jenny-safety-level/jenny-safety-level.route.code.ts"),
  route("api/surplus", "routes/jenny-surplus/jenny-surplus.route.code.ts"),
  route("api/upkeep", "routes/jenny-upkeep/jenny-upkeep.route.code.ts"),
  route(
    "api/push/register",
    "routes/jenny-api-push-register/jenny-api-push-register.route.code.ts"
  ),
  route("api/errors", "routes/jenny-api-errors/jenny-api-errors.route.code.ts"),
  route("api/page-events", "routes/jenny-api-page-events/jenny-api-page-events.route.code.ts"),
  route("api/page-follow", "routes/jenny-api-page-follow/jenny-api-page-follow.route.code.ts"),
] satisfies RouteConfig
