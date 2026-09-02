import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-out", "routes/sign-out.ts"),
  route("api/health", "routes/api.health.ts"),
  route("api/live-version", "routes/api.live-version.ts"),
  route("api/categorization", "routes/api.categorization.ts"),
  route("api/readout-relay", "routes/api.readout-relay.ts"),
  route("api/safety-level", "routes/api.safety-level.ts"),
  route("api/surplus", "routes/api.surplus.ts"),
  route("api/push/register", "routes/api.push.register.ts"),
  route("api/errors", "routes/api.errors.ts"),
] satisfies RouteConfig
