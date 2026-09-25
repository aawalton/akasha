import type { Slide } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/slide.page-type.types.ts"

export const autcon2026About = {
  id: "01a0d624-9333-7e1c-bddb-c10b0d967dab",
  type: "page-type/slide",
  slug: "autcon-2026-about",
  title: "About Alan",
  deck: "site-document/audhdalan-web-autcon-2026",
  number: 1,
  kind: "about",
  points: [
    {
      title: "self-diagnosed two years ago at age 38",
      value: "AuDHD",
      icon: "brain",
    },
    { title: "at tech companies", value: "18 years", icon: "code" },
    { title: "recovering from autistic burnout", value: "18 months", icon: "heart-pulse" },
    { title: "building measurement systems", value: "20+ years", icon: "gauge" },
  ],
  image: "image/image-d6a4b4ce0bb3ec5d",
  imageCaption: "Alan Walton",
} as const satisfies Slide
