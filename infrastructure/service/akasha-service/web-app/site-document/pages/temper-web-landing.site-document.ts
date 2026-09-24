import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const temperWebLanding = {
  id: "01a0d5c9-d0b0-7734-a2f3-a3a3218f329b",
  type: "page-type/site-document",
  slug: "temper-web-landing",
  title: "Temper",
  description:
    "Temper is a planning tool for ESO players. Build and compare character and companion setups — gear, skills, and stats — in your browser, and share them by link.",
  webApp: "web-app/temper-web",
  urlPath: "",
  lead: "An Elder Scrolls Online build optimizer.",
  sections: [
    {
      anchor: "before-you-sign-up",
      title: "Before you sign up",
      text: "Temper can also track your completion and inventory from your actual characters. That needs data out of the game, which takes some setup in ESO first.\n\n- **The Temper ESO add-ons** — TemperCharacters and TemperItems — write the files Temper reads. You download them from Temper, extract them into your ESO add-ons folder, and enable them in game.\n- **Tamriel Trade Centre**, a separate community add-on that is not ours, is where Temper gets item prices. Its terms do not allow us to include it, so you install that one yourself. Without it Temper can only value your items at vendor prices, well below what they are worth.\n- **The Temper Watcher**, which picks those files up automatically, is a Windows 10 or 11 (64-bit) application. There is no macOS or Linux build — on macOS and Linux you upload the files by hand instead.\n\nUntil that setup is done, Temper cannot see your characters, and every surface that reflects your own account will be empty. The build planner does not depend on any of it.",
    },
  ],
} as const satisfies SiteDocument
