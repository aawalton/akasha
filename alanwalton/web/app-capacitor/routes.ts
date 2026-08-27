import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/app-layout.tsx", [
    index("routes/home.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
] satisfies RouteConfig
