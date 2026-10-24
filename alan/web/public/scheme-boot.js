;(() => {
  try {
    const root = document.documentElement
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)")
    const apply = () => {
      const chosen = root.dataset.schemeChoice
      const light = chosen === "light" || (chosen === "system" && prefersLight.matches)
      if (light) root.dataset.scheme = "light"
      else delete root.dataset.scheme
    }
    apply()
    prefersLight.addEventListener("change", apply)
    new MutationObserver(apply).observe(root, {
      attributes: true,
      attributeFilter: ["data-scheme-choice"],
    })
  } catch {}
})()
