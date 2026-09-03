import { PageTitle } from "@akasha/design-layout/page-layout"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent, CardHeader, CardTitle } from "@akasha/design-primitives/card"
import { Heading } from "@akasha/design-primitives/heading"
import { Link } from "react-router"

export default function LandingRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Temper</PageTitle>
          <Heading variant="subsection-accent" as="h2">
            An Elder Scrolls Online build optimizer.
          </Heading>
          <p className="text-secondary text-sm">
            Temper is a planning tool for ESO players. Build and compare character and companion
            setups — gear, skills, and stats — in your browser, and share them by link.
          </p>
        </header>

        {}
        <Card id="before-you-sign-up">
          <CardHeader>
            <CardTitle>Before you sign up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-secondary text-sm">
              Temper can also track your completion and inventory from your actual characters. That
              needs data out of the game, which takes some setup in ESO first.
            </p>
            <ul className="space-y-2 text-secondary text-sm">
              <li>
                <strong>The Temper ESO add-ons</strong> — TemperCharacters and TemperInventory —
                write the files Temper reads. You download them from Temper, extract them into your
                ESO add-ons folder, and enable them in game.
              </li>
              <li>
                <strong>Tamriel Trade Centre</strong>, a separate community add-on that is not ours,
                is where Temper gets item prices. Its terms do not allow us to include it, so you
                install that one yourself. Without it Temper can only value your items at vendor
                prices, well below what they are worth.
              </li>
              <li>
                <strong>The Temper Watcher</strong>, which picks those files up automatically, is a
                Windows 10 or 11 (64-bit) application. There is no macOS or Linux build — on macOS
                and Linux you upload the files by hand instead.
              </li>
            </ul>
            <p className="text-secondary text-sm">
              Until that setup is done, Temper cannot see your characters, and every surface that
              reflects your own account will be empty. The build planner does not depend on any of
              it.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button asChild variant="accent">
            <Link to="/sign-up">Create an account</Link>
          </Button>
          <p className="text-secondary text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-accent underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
