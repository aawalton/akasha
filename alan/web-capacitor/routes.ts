import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/alan-web-capacitor-home/alan-web-capacitor-home.route.code.tsx"),
    route(
      ":pageTypeSlug/:pageHrefParam",
      "routes/alan-web-capacitor-page-detail/alan-web-capacitor-page-detail.route.code.tsx"
    ),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
] satisfies RouteConfig
