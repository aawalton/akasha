import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("categories", "routes/categories.tsx"),
  route("transactions", "routes/transactions.tsx"),
  route("rules", "routes/rules.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-out", "routes/sign-out.ts"),
  route("api/health", "routes/api.health.ts"),
  route("api/categorization", "routes/api.categorization.ts"),
  route("api/safety-level", "routes/api.safety-level.ts"),
  route("api/surplus", "routes/api.surplus.ts"),
  route("api/push/register", "routes/api.push.register.ts"),
] satisfies RouteConfig
