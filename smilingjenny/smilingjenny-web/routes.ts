import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-out", "routes/sign-out.ts"),
  route("api/health", "routes/jenny-api-health/jenny-api-health.route.code.ts"),
  route("api/live-version", "routes/jenny-api-live-version/jenny-api-live-version.route.code.ts"),
  route("api/categorization", "routes/jenny-categorization/jenny-categorization.route.code.ts"),
  route("api/readout-relay", "routes/jenny-readout-relay/jenny-readout-relay.route.code.ts"),
  route("api/safety-level", "routes/jenny-safety-level/jenny-safety-level.route.code.ts"),
  route("api/surplus", "routes/jenny-surplus/jenny-surplus.route.code.ts"),
  route("api/push/register", "routes/api.push.register.ts"),
  route("api/errors", "routes/api.errors.ts"),
] satisfies RouteConfig
